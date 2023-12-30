import ResourceModelDto from "./ResourceModelDto";

export default class ArticleModelDto {
  id?: string;
  title?: string;
  content?: string;
  resources?: ResourceModelDto[];
  published?: boolean;
}
