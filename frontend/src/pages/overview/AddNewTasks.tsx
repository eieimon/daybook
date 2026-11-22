import { useState } from "react";
import ButtonWidget from "../../components/buttons/BasicButton";
import { IoAdd } from "react-icons/io5";
import FormModal from "@/components/modals/formModal";
import TaskForm from "./TaskForm";

const AddNewTasks = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <ButtonWidget
        label="New Task"
        icon={<IoAdd />}
        aria-haspopup="dialog"
        aria-controls="new-task-dialog"
        onClick={() => {
          setIsModalOpen(true);
        }}
      />

      {isModalOpen && (
        <FormModal
          title="New Task"
          open={isModalOpen}
          onModalClose={() => setIsModalOpen(false)}
          renderForm={TaskForm}
          DialogContentStyle="sm:max-w-[700px] px-[50px] rounded-[20px]"
        />
      )}
    </>
  );
};

export default AddNewTasks;
