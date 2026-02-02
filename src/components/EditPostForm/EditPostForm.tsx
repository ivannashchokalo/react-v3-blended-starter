import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import css from "./EditPostForm.module.css";
import { EditPostData } from "../../types/post";
import { FormValues, PostSchema } from "../../utils/formUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";

interface EditPostFormProps {
  postToEdit: EditPostData;
  onCloseModal: () => void;
}

export default function EditPostForm({
  postToEdit: { id, ...dataToEdit },
  onCloseModal,
}: EditPostFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editPost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onCloseModal();
    },
  });
  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    mutate({ id, ...values });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={dataToEdit as FormValues}
      onSubmit={handleSubmit}
      validationSchema={PostSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onCloseModal} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
