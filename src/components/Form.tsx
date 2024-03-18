import {
  type ReactNode,
  type FormEvent,
  type ComponentPropsWithoutRef,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";

type FormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (data: unknown) => void;
  childern?: ReactNode;
};

export interface FormHandle {
  clear: () => void;
}

const Form = forwardRef<FormHandle, FormProps>(function Form(
  { onSave, children, ...otherProps },
  ref,
) {
  const form = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => {
    return {
      clear() {
        form.current?.reset();
      },
    };
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  }

  return (
    <form onSubmit={handleSubmit} {...otherProps} ref={form}>
      {children}
    </form>
  );
});

export default Form;
