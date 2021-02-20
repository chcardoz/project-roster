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
import { InputField } from "../input/InputField";
import { useCreateStudentMutation } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
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
            //     const { data, error } = await recordMeeting({
            //       options: {
            //         duration: parseInt(duration),
            //         studentID: 0,
            //         meetingDate: meetingDate.toISOString(),
            //       },
            //     });
            //     /*    ERRORS BEFORE RUNNING THE RESOLVERS     */
            //     if (error) {
            //       /*    ERRORS FROM FORM VALIDATION     */
            //     } else if (data?.createMeeting.errors) {
            //       setErrors(toErrorMap(data?.createMeeting.errors));
            //       /*    NO FORM OR RESOLVER ERRORS, SO LETS GOO!!    */
            //     } else if (data?.createMeeting?.meeting) {
            //       handleClose();
            //     }
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
                  <MenuItem value={``}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="groupme">GroupMe</MenuItem>
                  <MenuItem value="whatsapp">Whatsapp</MenuItem>
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
  );
};

export default withUrqlClient(createUrqlClient)(CreateStudent);
