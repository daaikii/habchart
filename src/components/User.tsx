import React, { useState } from "react";
import styles from "./User.module.css";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Box,
  Modal,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import EmailIcon from "@material-ui/icons/Email";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { auth, storage } from "../firebase";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { useUpdateUserProfile } from "../context/userContext";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5em auto",
  },
  modal: {
    outline: "none",
    position: "absolute",
    width: 400,
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const User: React.FC = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [resetEmail, setResetEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const updateUserProfile = useUpdateUserProfile();
  const user = firebase.auth().currentUser;
  const history = useHistory();

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };
  const deleteAcount = () => {
    if( window.confirm("削除しますか？") ) {
      user?.delete()
      .catch((err) => {
        alert(err.message);
      });
    }
    else {
      alert("キャンセルしました");
    }
  };
  const handleUpdate = async () => {
    let url = "";
    if (avatarImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + avatarImage.name;
      await storage.ref(`avatars/${fileName}`).put(avatarImage);
      url = await storage.ref("avatars").child(fileName).getDownloadURL();
    }
    await user?.updateProfile({
      displayName: username,
      photoURL: url,
    });
    history.push("/")
  };

  return (
    <Grid
      item
      xs={8}
      sm={8}
      md={5}
      component={Paper}
      elevation={6}
      className={classes.root}
    >
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          編集
        </Typography>
        <form>
          <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
              }}
            />
            <Box textAlign="center">
              <IconButton>
                <label>
                  <AccountCircleIcon
                    fontSize="large"
                    className={
                      avatarImage
                        ? styles.login_addIconLoaded
                        : styles.login_addIcon
                    }
                  />
                  <input
                    className={styles.login_hiddenIcon}
                    type="file"
                    onChange={onChangeImageHandler}
                  />
                </label>
              </IconButton>
            </Box>
          </>
        </form>

        <span onClick={() => setOpenModal(true)}>Reset password?</span>
        <Button
          disabled={!username || !avatarImage}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          startIcon={<EmailIcon />}
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={deleteAcount}
        >
          Delete
        </Button>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div style={getModalStyle()} className={classes.modal}>
            <div className={styles.login_modal}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                type="email"
                name="email"
                label="Reset E-mail"
                value={resetEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setResetEmail(e.target.value);
                }}
              />
              <IconButton onClick={sendResetEmail}>
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </Modal>
      </div>
    </Grid>
  );
};

export default User;