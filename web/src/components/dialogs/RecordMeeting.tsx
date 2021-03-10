import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import { Form, Formik } from "formik";
import React from "react";
import { useCreateMeetingMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../input/InputField";

interface MeetingProps {
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

const RecordMeeting: React.FC<MeetingProps> = ({ open, handleClose }) => {
  const [, recordMeeting] = useCreateMeetingMutation();
  const [meetingDate, setMeetingDate] = React.useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setMeetingDate(date);
  };

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
      <DialogTitle id="alert-dialog-title">{"RECORD MEETING"}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            studentID: "",
            duration: "",
          }}
          onSubmit={async ({ duration }, { setErrors }) => {
            const { data, error } = await recordMeeting({
              options: {
                duration: parseInt(duration),
                studentID: 0,
                meetingDate: meetingDate.toISOString(),
              },
            });
            /*    ERRORS BEFORE RUNNING THE RESOLVERS     */
            if (error) {
              /*    ERRORS FROM FORM VALIDATION     */
            } else if (data?.createMeeting.errors) {
              setErrors(toErrorMap(data?.createMeeting.errors));
              /*    NO FORM OR RESOLVER ERRORS, SO LETS GOO!!    */
            } else if (data?.createMeeting?.meeting) {
              handleClose();
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={classes.container}>
                <InputField label="Student" name="studentID" />
                <br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    inputVariant="outlined"
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Meeting date"
                    value={meetingDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <br />
                <InputField
                  label="Meeting Duration (minutes)"
                  name="duration"
                />
                <br />
                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  type="submit"
                  color="primary"
                >
                  RECORD MEETING
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

export default RecordMeeting;
