import "./style.scss";
import PropTypes from 'prop-types'; 
const AlertModal = ({
  setIsOpenAlertModal,
  mode,
  messageCode,
  modalErrorMessage,
  setModalErrorMessage,
}) => {
  const messages = [
    {
      code: 0,
      message1: "",
      message2: "を入力してください。",
    },
    {
      code: 1,
      message1: "使用可能な",
      message2: "です。",
    },
    {
      code: 2,
      message1: "既に登録されている",
      message2: "です。",
    },
  ];

  const message = messages.find((m) => m.code === messageCode);

  const handleClose = () => {
    setModalErrorMessage("")
    setIsOpenAlertModal(false);
  };
  console.log("isOpenAlterMessageCode", mode);
  console.log("isOpenAlterMode", messageCode);
  console.log("openModal");
  return (
    <div className="alertModalInner">
      <div className="modalMessageSection">
        {modalErrorMessage ? (
          <span>{modalErrorMessage}</span>
        ) : (
          <span>
            {" "}
            {message?.message1}
            {mode}
            {message?.message2}
          </span>
        )}
      </div>
      <div className="modalCloseBtnSection">
        <button onClick={handleClose}>確認</button>
      </div>
    </div>
  );
};

AlertModal.propTypes = {
  setIsOpenAlertModal: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  messageCode: PropTypes.number.isRequired,
  modalErrorMessage: PropTypes.string.isRequired,
  setModalErrorMessage: PropTypes.func.isRequired
};
export default AlertModal;
