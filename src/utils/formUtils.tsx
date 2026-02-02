import * as Yup from "yup";

export interface FormValues {
  title: string;
  body: string;
}

export const PostSchema = Yup.object().shape({
  title: Yup.string().min(2, "Too short title").required(),
  body: Yup.string().min(20, "Too short text").max(500, "Too long text").required(),
});
