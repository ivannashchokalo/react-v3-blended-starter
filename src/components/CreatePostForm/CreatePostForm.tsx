import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";
import css from "./CreatePostForm.module.css";
import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";
import { FormValues, PostSchema } from "../../utils/formUtils";

const initialValues: FormValues = {
  title: "",
  body: "",
};

interface PostFormProps {
  onCloseModal: () => void;
}

export default function PostForm({ onCloseModal }: PostFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onCloseModal();
    },
  });

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    mutate(values);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-body`}>Content</label>
          <Field
            id={`${fieldId}-body`}
            as="textarea"
            name="body"
            rows="8"
            className={css.textarea}
          />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onCloseModal} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
