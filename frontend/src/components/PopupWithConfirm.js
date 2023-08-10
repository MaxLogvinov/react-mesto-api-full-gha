import PopupWithForm from './PopupWithForm ';

function PopupWithConfirm({
  isOpen,
  onClose,
  onEscClose,
  onCardDelete,
  isLoading,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete();
  }
  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      textSaveButton="Да"
      textSavingButton="Удаление..."
      isOpen={isOpen}
      onClose={onClose}
      onEscClose={onEscClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    ></PopupWithForm>
  );
}

export default PopupWithConfirm;
