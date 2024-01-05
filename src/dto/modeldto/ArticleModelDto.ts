import ResourceModelDto from "./ResourceModelDto";
import UserModelDto from "./UserModelDto";

export default class ArticleModelDto {
  id?: string;
  title?: string;
  content?: string;
  resources?: ResourceModelDto[];
  titleImage?: string;
  published?: boolean;
  author?: UserModelDto;
}
