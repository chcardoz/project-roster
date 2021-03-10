import DateFnsUtils from "@date-io/date-fns";
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
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import { Form, Formik } from "formik";
import React from "react";
import { useCreateOutreachMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../input/InputField";
import { SelectField } from "../input/SelectField";

interface OutreachProps {
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

const RecordOutreach: React.FC<OutreachProps> = ({ open, handleClose }) => {
  const [, recordOutreach] = useCreateOutreachMutation();
  const [outreachDate, setOutreachDate] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: Date | null) => {
    setOutreachDate(date);
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
            type: "",
          }}
          onSubmit={async ({ type }, { setErrors }) => {
            const { data, error } = await recordOutreach({
              options: {
                studentID: 0,
                outreachDate: outreachDate.toISOString(),
                type: type,
              },
            });
            /*    ERRORS BEFORE RUNNING THE RESOLVERS     */
            if (error) {
              /*    ERRORS FROM FORM VALIDATION     */
            } else if (data?.createOutreach.errors) {
              setErrors(toErrorMap(data?.createOutreach.errors));
              /*    NO FORM OR RESOLVER ERRORS, SO LETS GOO!!    */
            } else if (data?.createOutreach?.outreach) {
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
                    label="Outreach Date"
                    value={outreachDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <br />
                <SelectField label="Outreach Type" name="type">
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
                  RECORD OUTREACH
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

export default RecordOutreach;
