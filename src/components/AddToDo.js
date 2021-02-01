import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useFormik, FieldArray } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";

//Redux action
import {
  set_counter_increment,
  set_add_task,
  set_delete_task,
} from "../store/actions/index";

const AddToDo = (props) => {
  const id = props.count;

  //set default current date to date field
  const [startDate, setStartDate] = useState(new Date());
  const [test, setTest] = useState("");
  const dispatch = useDispatch();

  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      taskName: "",
      date: startDate,
      status: "",
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required("Please enter the task name"),
      status: Yup.string().required(
        "Please select one status from the dropdown"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Task Added into the TO DO LIST",
        timer: 1000,
        onOpen: function () {
          Swal.showLoading();
        },
      }).then(function (result) {
        if (result) {
          values.date = moment(startDate).format("MM/DD/YYYY");
          values.id = id;

          //Stored the task in to the redux store
          dispatch(set_add_task(values));
          //Increased the counter to make unique id for each row
          dispatch(set_counter_increment({ id: id }));
          //Reset form to initial value
          setStartDate(new Date());
          //Reset the form after adding a task in to the list
          resetForm();
        }
      });
    },
  });

  const datePickerHandler = (date) => {
    setStartDate(date);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="panel panel-primary">
            <div className="panel-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <h2>TO-DO LIST</h2>
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
                    placeholder="New Task"
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
                    onChange={(date) => datePickerHandler(date)}
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
                    ADD
                  </button>
                </div>

                <hr />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToDo;
