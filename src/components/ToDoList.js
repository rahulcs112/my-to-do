import React from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { set_delete_task } from "../store/actions/index";

const ToDoList = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();

  //destructring the props to get the task list
  const { tasks } = props;

  //once user will click on edit icon then it will redirect him to edit page
  const handleEditTask = (id) => {
    history.push("/edit/" + id);
  };

  //delete function to delete the task from list
  const handleRemoveTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      console.log(result);
      if (result.value) {
        //Once user will click on confirmation
        //then task will be delete from the list by calling set_delete action
        dispatch(set_delete_task({ id: id }));
      }
    });
  };

  const columns = [
    {
      name: "Id",
      selector: "id",
      sortable: true,
    },
    {
      name: "Task Name",
      selector: "taskName",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
    {
      // Custome column 'Action' in table
      name: "Action",
      cell: (row) => (
        <React.Fragment>
          <button
            onClick={() => handleEditTask(row.id)}
            className="btn btn-success"
            style={{ marginRight: "10px" }}
          >
            <i className="fa fa-edit"></i>
          </button>{" "}
          <button
            onClick={() => handleRemoveTask(row.id)}
            className="btn btn-danger"
          >
            <i className="fa fa-trash"></i>
          </button>
        </React.Fragment>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title=""
        defaultSortField="id"
        defaultSortAsc="false"
        highlightOnHover="true"
        pointerOnHover="true"
        responsive="true"
        columns={columns}
        data={tasks}
        pagination={true}
      />
    </>
  );
};

export default ToDoList;
