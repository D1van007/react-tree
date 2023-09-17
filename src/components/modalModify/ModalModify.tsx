import { modeModaleEnum } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setNewNodeName, setNodeName } from "../../store/slices/nodeReducer";
import { Button, ButtonSize } from "../ui/button/Button";
import styles from "./modalModify.module.scss";

interface IModalModify {
  mode: "delete" | "create" | "rename" | "default";
  callback: () => void;
  closeModal: () => void;
}

export const ModalModify = ({ mode, callback, closeModal }: IModalModify) => {
  const dispatch = useDispatch();

  const nodeNameState = useSelector(
    (state) => (state as RootState).node.nodeName
  );
  const newNodeNameState = useSelector(
    (state) => (state as RootState).node.newNodeName
  );

  const inputValue =
    mode === modeModaleEnum.RENAME && newNodeNameState === undefined
      ? nodeNameState
      : newNodeNameState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    mode === modeModaleEnum.CREATE &&
      dispatch(setNodeName(e.currentTarget.value));
    mode === modeModaleEnum.RENAME &&
      dispatch(setNewNodeName(e.currentTarget.value));
  };

  const handleClickCancel = () => {
    closeModal();
  };
  const handleClickModify = () => {
    callback();
    dispatch(setNodeName(""));
    dispatch(setNewNodeName(undefined));
  };

  return (
    <>
      <h3 className={styles.title}> {mode}</h3>
      <div className={styles.content}>
        {mode !== modeModaleEnum.DELETE ? (
          <>
            <label
              htmlFor="modal-input"
              className={newNodeNameState && styles.labelActive}
            >
              {mode === modeModaleEnum.CREATE ? " Name Node" : "New Node Name"}
            </label>
            <input
              id="modal-input"
              type="text"
              onChange={handleChange}
              value={inputValue}
            />
          </>
        ) : (
          <p>Do you wont delete "{nodeNameState}"?</p>
        )}
      </div>
      <div className={styles.containerBtn}>
        <Button onClick={handleClickCancel} size={ButtonSize.SMALL}>
          CANCEL
        </Button>
        <Button mode={mode} onClick={handleClickModify} size={ButtonSize.SMALL}>
          {mode.toLocaleUpperCase()}
        </Button>
      </div>
    </>
  );
};
