"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ArticleResource from "@/components/articleresource/ArticleResource";
import Modal from "@/util/modal/Modal";
import { useMutation } from "react-query";
import {
  startArticle,
  updateArticle,
  updateArticleWithTitleImage,
} from "@/controller/article/ArticleController";
import { toast } from "react-toastify";
import LoadingComp from "@/components/loadingcomp/LoadingComp";
import Image from "next/image";

function NewArticlePage() {
  const editorRef = useRef<any>(null);
  const [showUploadBox, setShowUploadBox] = useState(false);
  const [formState, setFormState] = useState<File[] | null>(null);
  const [articleStarted, setArticleStarted] = useState(false);
  const [articleId, setArticleId] = useState<string>("");
  const [articleTitle, setArticleTitle] = useState("");
  const [titleImg, setTitleImg] = useState<string | null | undefined>(null);
  const [titleImgFile, setTitleImgFile] = useState<File | null>(null);
  const [articleState, setArticleState] = useState(false);
  const [titleImgChanged, setTitleImgChanged] = useState(false);
  const articleStartMutation = useMutation({
    mutationFn: startArticle,
    onSuccess: (data) => {
      if (articleStarted) {
        toast.success("Title update scuccess");
        setArticleTitle(data.title);
        return;
      }
      setArticleId(data.id);
      toast.success("Article start scuccess");
      setArticleStarted(true);
      setArticleState(false);
    },
    onError: (e: Error) => {
      toast.error(e.message);
      console.log(e);
    },
  });

  const articleUpdateMutation = useMutation({
    mutationFn: updateArticle,
    onSuccess: (data) => {
      toast.success("Article update scuccess");
      setArticleTitle(data.title);
      setArticleState(data.published);
    },
    onError: (e: Error) => {
      toast.error(e.message);
      console.log(e);
    },
  });

  const articleTitleImgMutation = useMutation({
    mutationFn: updateArticleWithTitleImage,
    onSuccess: () => {
      toast.success("Title image upload success");
      setTitleImgChanged(false);
    },
    onError: () => {
      toast.error("Title image upload failed.");
      setTitleImgChanged(true);
    },
  });

  const getContent = () => {
    const content = editorRef.current.getContent();
    articleUpdateMutation.mutate({ id: articleId, content: content });
  };

  const publishArticleState = () => {
    articleUpdateMutation.mutate({ id: articleId, published: !articleState });
  };
  return (
    <>
      <div className="w-full">
        <div className="w-full flex flex-col">
          {(articleStartMutation.isLoading ||
            articleUpdateMutation.isLoading ||
            articleTitleImgMutation.isLoading) && <LoadingComp />}
          <h5 className="text-sm">Start article by giving a title</h5>
          <div className="flex flex-wrap gap-5 w-full items-center justify-center md:justify-start">
            <input
              type="text"
              placeholder="title"
              className="geninput text-sm flex-1 max-w-xl min-w-[320px]"
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
            />
            {!articleStarted && (
              <button
                className="genbtn text-xs"
                disabled={
                  articleStartMutation.isLoading ||
                  articleUpdateMutation.isLoading
                }
                onClick={() => {
                  articleStartMutation.mutate(articleTitle);
                }}
              >
                Start Article
              </button>
            )}
            {articleStarted && (
              <button
                disabled={
                  articleStartMutation.isLoading ||
                  articleUpdateMutation.isLoading
                }
                className="genbtn text-xs"
                onClick={() => {
                  articleUpdateMutation.mutate({
                    title: articleTitle,
                    id: articleId,
                  });
                }}
              >
                Update title
              </button>
            )}
          </div>
        </div>

        {/* title image upload start */}

        {articleStarted && (
          <>
            <div>
              <h1 className=" my-5 text-xs text-gray-500">
                Choose Title Image
              </h1>
            </div>
            <label htmlFor="titleImg" className="mx-auto ">
              <div className=" mb-5 w-full max-w-[300px] aspect-video relative mx-auto  border rounded-lg shadow-lg cursor-pointer overflow-hidden">
                <Image
                  fill
                  alt="Title image"
                  src={titleImg ?? "/noimg.png"}
                  className="object-cover "
                />
              </div>
              <input
                id="titleImg"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setTitleImgChanged(true);
                  setTitleImg(URL.createObjectURL(file));
                  setTitleImgFile(file);
                }}
              />
              <button
                className="genbtn text-xs"
                disabled={!titleImgChanged || articleTitleImgMutation.isLoading}
                onClick={() => {
                  if (titleImgFile)
                    articleTitleImgMutation.mutate({
                      articleId: articleId,
                      imgFile: titleImgFile,
                    });
                }}
              >
                Update Title Image
              </button>
            </label>
          </>
        )}
        {/* title image upload end */}

        {articleStarted && (
          <>
            <h1 className="text-sm text-gray-500 font-bold md:text-base my-2">
              Create, Edit your Article
            </h1>
            <Editor
              onInit={(evt, editor) => {
                editorRef.current = editor;
              }}
              apiKey="h9xmqbsx9xe07lq33hozbfxlw0oep3tfbuu0w0cp1drrf31x"
              init={{
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
              }}
              initialValue="<h1>Hello World</h1>"
            />
            <button
              className="genbtn my-2"
              onClick={getContent}
              disabled={
                articleStartMutation.isLoading ||
                articleUpdateMutation.isLoading
              }
            >
              Update Article
            </button>

            <button
              className="genbtn my-2  mx-5"
              onClick={publishArticleState}
              disabled={
                articleStartMutation.isLoading ||
                articleUpdateMutation.isLoading
              }
            >
              {!articleState ? <span>Publish</span> : <span>Unpublish</span>}{" "}
              Article
            </button>

            {/* resource upload controls */}
            <div className="w-full my-2 border rounded-lg genp">
              <h1 className="text-base md:text-lg font-bold text-gray-500">
                Resouces
              </h1>
              <h1 className="text-xs sm:text-sm ">
                Resource to be used in the Article. Upload them and use their
                url by clicking on the resource below.{" "}
              </h1>
              <button className="genbtn" onClick={() => setShowUploadBox(true)}>
                Upload Resource
              </button>
              <div className="flex flex-row max-w-full gap-x-3 overflow-x-auto mt-5">
                <ArticleResource />
                <ArticleResource />
              </div>
            </div>
          </>
        )}
      </div>
      {showUploadBox && (
        <Modal
          onClickDark={() => {
            setShowUploadBox(false);
          }}
        >
          {
            <div
              className="w-screen max-w-xl genp bg-white rounded-lg shadow-md border"
              onClick={(e) => e.stopPropagation()}
            >
              <h1>Choose local files</h1>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData();

                  formState?.forEach((i) =>
                    formData.append("resourceFiles", i)
                  );

                  const response = await fetch("/api/testapi", {
                    method: "POST",
                    body: formData,
                  });

                  const responseBody = await response.json();

                  console.log(typeof responseBody);
                  response.ok ? window.alert("OK") : window.alert("NOT OK");
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  name="resourceFile"
                  onChange={(e) => {
                    const files = [];
                    if (e.target.files) {
                      for (let i = 0; i < e.target.files.length; ++i) {
                        files.push(e.target.files[i]);
                      }
                    }

                    setFormState(files);
                  }}
                />
                <input type="submit" value={"Upload"} className="genbtn" />
              </form>
            </div>
          }
        </Modal>
      )}
    </>
  );
}
export default NewArticlePage;
