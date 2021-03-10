import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useCreateStudentMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../input/InputField";
import { SelectField } from "../input/SelectField";

interface CreateStudentProps {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      paddingTop: 20,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
  })
);

const CreateStudent: React.FC<CreateStudentProps> = ({ open, handleClose }) => {
  const [, createStudent] = useCreateStudentMutation();

  const classes = useStyles();
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">{"CREATE STUDENT"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              population: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const { data, error } = await createStudent({
                options: values,
              });
              /*    ERRORS BEFORE RUNNING THE RESOLVERS     */
              if (error) {
                /*    ERRORS FROM FORM VALIDATION     */
              } else if (data?.createStudent.errors) {
                setErrors(toErrorMap(data?.createStudent.errors));
                /*    NO FORM OR RESOLVER ERRORS, SO LETS GOO!!    */
              } else if (data?.createStudent?.student) {
                handleClose();
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className={classes.container}>
                  <InputField label="First Name" name="firstName" />
                  <br />
                  <InputField label="Last Name" name="lastName" />
                  <br />
                  <InputField label="Email" name="email" />
                  <br />
                  <SelectField label="Population" name="population">
                    <MenuItem value="star-probation">STAR Probation</MenuItem>
                    <MenuItem value="star-reinstated">STAR Reinstated</MenuItem>
                    <MenuItem value="span">SPAN</MenuItem>
                    <MenuItem value="veteran">Veteran</MenuItem>
                  </SelectField>
                  <br />
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    type="submit"
                    color="primary"
                  >
                    create student
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default CreateStudent;
