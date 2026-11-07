// import React from "react";
import BasicButtonWidget from "../../components/buttons/BasicButton";
import { IoAdd } from "react-icons/io5";

const AddNewTasks = () => {
  return <BasicButtonWidget label="New Task" icon={<IoAdd />} />;
};

export default AddNewTasks;
