import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useFormik, FieldArray } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";

//Redux action
import {
  set_counter_increment,
  set_add_task,
  update_task,
  set_delete_task,
} from "../store/actions/index";

const EditTask = (props) => {
  const taskId = props.match.params.id;

  let history = useHistory();

  const task = useSelector((state) => state.taskList.task[taskId]);

  if (task == null || task == undefined) {
    // If user try to access edit page for such entry
    // that does not exist in to the list then it will direct him to home page
    history.push("/");
  }

  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taskName: task && task.taskName ? task.taskName : "",
      date: task && task.date ? task.date : "",
      status: task && task.status ? task.status : "",
      id: task && task.id ? task.id : "",
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required("Please enter the task name"),
      status: Yup.string().required(
        "Please select one status from the dropdown"
      ),
    }),
    onSubmit: (values) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Task Updated into the TO DO LIST",
        timer: 1000,
        onOpen: function () {
          Swal.showLoading();
        },
      }).then(function (result) {
        if (result) {
          values.date = moment(values.date).format("MM/DD/YYYY");

          //Updated the edit value into the list by calling update_task action
          dispatch(update_task(values));

          //Once task will update into the list then user will redirect on home page
          history.push("/");
        }
      });
    },
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="panel panel-primary">
            <div className="panel-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <h2>EDIT TO-DO LIST</h2>
                </div>
                <div className="form-group">
                  <input
                    id="taskName"
                    type="text"
                    maxLength="50"
                    className={
                      "form-control" +
                      (formik.errors.taskName && formik.touched.taskName
                        ? " is-invalid"
                        : "")
                    }
                    placeholder="Edit Task"
                    name="taskName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.taskName}
                  />
                  {formik.touched.taskName && formik.errors.taskName ? (
                    <div className="invalid-feedback">
                      {formik.errors.taskName}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <DatePicker
                    name="date"
                    className="form-control"
                    selected={startDate}
                    maxLength="50"
                    onChange={(date) => setStartDate(date)}
                    value={formik.values.date}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="form-group">
                  <select
                    maxLength="50"
                    className={
                      "form-control" +
                      (formik.errors.status && formik.touched.status
                        ? " is-invalid"
                        : "")
                    }
                    placeholder="status"
                    name="status"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                  >
                    <option value="">Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">In-Active</option>
                  </select>

                  {formik.touched.status && formik.errors.status ? (
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <button
                    id="signupSubmit"
                    type="submit"
                    className="btn btn-info btn-block"
                  >
                    UPDATE
                  </button>
                </div>

                <hr />
              </form>
            </div>
          </div>
        </div>
        <Link to="/">Back</Link>
      </div>
    </>
  );
};
export default EditTask;
