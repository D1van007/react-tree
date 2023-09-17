import { CustomerError, modeModaleEnum } from "../../types/types";
// import styles from "./modalError.module.scss";

interface IModalError {
  mode: "delete" | "create" | "rename" | "default";
  error?: CustomerError;
  errorCreateNode?: CustomerError;
  errorDeleteNode?: CustomerError;
  errorRenameNode?: CustomerError;
}

export const ModalError = ({
  mode,
  error,
  errorCreateNode,
  errorDeleteNode,
  errorRenameNode,
}: IModalError) => {
  return (
    <>
      <h2>Error!</h2>

      {error && (
        <>
          <p>{(error as CustomerError).data.data.message} </p>
          <p>Please try again.</p>
        </>
      )}
      {mode === modeModaleEnum.CREATE && errorCreateNode && (
        <p>{(errorCreateNode as CustomerError).data.data.message}</p>
      )}
      {mode === modeModaleEnum.DELETE && errorDeleteNode && (
        <p>{(errorDeleteNode as CustomerError).data.data.message}</p>
      )}
      {mode === modeModaleEnum.RENAME && errorRenameNode && (
        <p>{(errorRenameNode as CustomerError).data.data.message}</p>
      )}
    </>
  );
};
