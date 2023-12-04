"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ArticleResource from "@/components/articleresource/ArticleResource";
import Modal from "@/util/modal/Modal";

function NewArticlePage() {
  const editorRef = useRef<any>(null);
  const [showUploadBox, setShowUploadBox] = useState(false);
  const [formState, setFormState] = useState<File[] | null>(null);

  const getContent = () => {
    const content = editorRef.current.getContent();
    console.log(content);
  };
  return (
    <>
      <div className="w-full">
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
        <button className="genbtn my-2" onClick={getContent}>
          Create Article
        </button>
        {/* resource upload controls */}
        <div className="w-full my-2 border rounded-lg genp">
          <h1 className="text-base md:text-lg font-bold text-gray-500">
            Resouces
          </h1>
          <h1 className="text-xs sm:text-sm ">
            Resource to be used in the Article. Upload them and use their url by
            clicking on the resource below.{" "}
          </h1>
          <button className="genbtn" onClick={() => setShowUploadBox(true)}>
            Upload Resource
          </button>
          <div className="flex flex-row max-w-full gap-x-3 overflow-x-auto mt-5">
            <ArticleResource />
            <ArticleResource />
            <ArticleResource />
            <ArticleResource />
            <ArticleResource />
            <ArticleResource />
            <ArticleResource />
            <ArticleResource />
            <ArticleResource />
            <ArticleResource />
            <ArticleResource />
            <ArticleResource />
          </div>
        </div>
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
