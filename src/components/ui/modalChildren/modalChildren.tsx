import { modeModaleEnum } from "../../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setNewNodeName, setNodeName } from "../../../store/slices/nodeReducer";

interface IModalChildren {
  mode: "delete" | "create" | "rename" | string;
  callback: () => void;
  closeModal: () => void;
}

export const ModalChildren = ({
  mode,
  callback,
  closeModal,
}: IModalChildren) => {
  const dispatch = useDispatch();

  const nodeNameState = useSelector(
    (state) => (state as RootState).node.nodeName
  );
  const newNodeNameState = useSelector(
    (state) => (state as RootState).node.newNodeName
  );

  const inputValue =
    mode === modeModaleEnum.RENAME && newNodeNameState
      ? newNodeNameState
      : nodeNameState;

  return (
    <>
      <>
        <h2> {mode.toLocaleUpperCase()}</h2>
        {mode !== modeModaleEnum.DELETE && (
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              mode === modeModaleEnum.CREATE &&
                dispatch(setNodeName(e.currentTarget.value));
              mode === modeModaleEnum.RENAME &&
                dispatch(setNewNodeName(e.currentTarget.value));
            }}
            value={inputValue}
          />
        )}
        {mode === modeModaleEnum.DELETE && (
          <p>Do you wont delete "{nodeNameState}"</p>
        )}

        <button
          onClick={() => {
            callback();
            dispatch(setNodeName(""));
            dispatch(setNewNodeName(""))
          }}
        >
          {mode.toLocaleUpperCase()}
        </button>
        <button onClick={closeModal}>CANCEL</button>
      </>

      {/* {mode === modeModaleEnum.RENAME && (
        <>
          <h2> {mode.toLocaleUpperCase()}</h2>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(setNodeName(e.currentTarget.value));
            }}
            value={newNodeName}
          />
          <button
            onClick={() => {
              callback();
              dispatch(setNodeName(""));
            }}
          >
            {mode.toLocaleUpperCase()}
          </button>
          <button onClick={closeModal}>CANCEL</button>
        </>
      )} */}
    </>
  );
};
