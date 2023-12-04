import ResourceModelDto from "./ResourceModelDto";

export default class ArticleModelDto {
  title?: string;
  content?: string;
  resources?: ResourceModelDto[];
}
