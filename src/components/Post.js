/** @format */

import * as React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import postStyle from "./../style/Postdetail.module.css";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Popover from "@mui/material/Popover";
import Badge from "@mui/material/Badge";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Avatar, Button, Divider, IconButton, Typography } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageGrid from "./../components/Gridview";
import { usePostContext } from "../context/PostContext";
import { useAuthContext } from "../context/AuthContext";
import { getFullUrl, BaseUrl, FrontEndBaseUrl } from "../helpers/Constant";
import { Audio } from "./Audio";
import LinkPreview from "./LinkPreview";
import moment from "moment";
import { SiOpenaccess } from "react-icons/si";
import { MdOutlinePublic } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import axios from "axios";
import Comment from "./Comment";
import CommentBox from "./CommentBox";

import PollOption from "./PollOption";
import { useBlogContext } from "../context/PostBlogContext";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiBox-root": {
      padding: 0,
      paddingTop: theme.spacing(1),
    },
  },
  allposts: {
    backgroundPosition: "center 120px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    minHeight: "500px",
    border: "1px solid rgb(229, 227, 221)",
    borderRadius: "4px",
    textAlign: "center",
    padding: "0px !important",
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      minHeight: "300px",
    },
  },
  postCard: {
    padding: "10px 20px",
  },
  accInfo: {
    display: "flex",
    padding: "0px",
    justifyContent: "start",
    alignItems: "center",
    "& .MuiAvatar-root": {
      width: "50px",
      height: "50px",
    },
    "& h3": {
      fontWeight: "600",
      marginLeft: "8px",
      fontSize: "0.75rem",
      marginBottom: "2px",
      marginTop: "0px",
    },

    "& span": {
      fontSize: "1rem",
      marginBottom: "0px",
    },
  },
  postInfo: {
    textAlign: "start",
    marginTop: "20px",
  },
  uploadFile: {
    margin: "8px 0px",
    padding: 0,
  },
  btnOptions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#706c64",
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },

    "& p": {
      display: "flex",
      alignSelf: "center",
    },
  },
  postDetail: {
    position: "relative",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  shade: {
    position: "absolute",
    bottom: 0,
    height: "5rem",
    width: "100%",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)",
  },
  // postContent: {
  //   height: "20px",
  //   overflow: "scroll",
  // },
  // comment start

  commentInfo: {
    display: "flex",
    marginBottom: theme.spacing(2),
    justifyContent: "space-between",
    "& a": {
      color: "#333",
    },
  },
  MainComment: {
    display: "flex",
    justifyContent: "space-between",
    gap: "3px",
    marginBottom: "1.3rem",
  },
  content: {
    display: "flex",
    justifyContent: "start",
    gap: "16px",
    flexGrow: 1,
  },
  commentDetail: {
    textAlign: "start",

    "& h4": {
      marginBottom: "10px",
      marginTop: "0px",
    },
    "& p": {
      fontSize: "0.978rem",
    },
  },
  commentSection: {
    padding: "20px",
    paddingBottom: "52px",
    textAlign: "start",
    flexGrow: "1",
    "& h4": {
      marginBottom: "10px",
      marginTop: "0px",
    },
  },
  reply: {
    marginLeft: "3.75rem",
    display: "flex",
    justifyContent: "space-between",
  },
  replyInfo: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    gap: "10px",
  },
  replyDetail: {
    flexGrow: 1,
    textAlign: "start",
    "& h4": {
      marginBottom: "10px",
    },
  },
  count: {
    display: "flex",
    alignSelf: "flex-end",
    fontSize: "1rem",
    color: "#000",
  },
  hideReply: {
    display: "none",
  },
  slider: {
    width: "60%",
  },
  readmore: {
    overflow: "hidden",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const Post = ({ id, post, postPage, ...props }) => {
  const classes = useStyles();
  const history = useHistory();
  const { reloading, setReloading, pusher } = useBlogContext();
  const [more, setMore] = React.useState(true);
  const [likes, setLikes] = React.useState([]);
  const [liked, setLiked] = React.useState(false);
  const { user, token } = useAuthContext();
  const [message, setMessage] = React.useState({});
  const [editPost, SetEditPost] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const regx = new RegExp("^(http|https)://", "i");
  const pass = regx.test(post?.creator.user_info.profile_image);

  //link
  // for link pop up
  const [popanchorEl, setPopAnchorEl] = React.useState(null);
  // const [selectedPoll, setSelectedPoll] = React.useState(0);

  const handelPopLinkshare = (event) => {
    // console.log('helo');
    setPopAnchorEl(popanchorEl ? null : event.currentTarget);
    navigator.clipboard.writeText(event.target.value);
  };

  const handlePopClose = () => {
    setPopAnchorEl(null);
  };

  const openLinkShare = Boolean(popanchorEl);
  // const shareid = openLinkShare ? "simple-popper" : undefined;

  // ============

  // image
  let newimgs = [];
  if (post?.image === null && typeof post?.image === "object") {
    newimgs = [];
  } else {
    const images = JSON.parse(post?.image);
    newimgs = images.map((img) => getFullUrl(img));
  }
  // ========

  const [limit, setLimit] = React.useState({
    comment: 2,
    reply: 2,
  });
  const finalLimit = React.useMemo(() => {
    return limit.comment;
  }, [limit.comment]);

  const [editReply, setEditReply] = React.useState({
    commentId: "",
    replyId: "",
    reply: "",
  });

  const loadmorecomment = (e) => {
    e.preventDefault();
    setLimit((prev) => ({
      ...prev,
      comment: prev.comment + 5,
    }));
  };

  const editPostHandle = (postid) => {
    // console.log(postid);
    history.push("/creator/post-edit/" + id);
  };

  const postLiked = async () => {
    let response = null;
    try {
      if (liked) {
        let like_obj = likes.filter(
          (item) => item?.user_info.user.id === user.id
        );
        console.log(like_obj);
        response = axios({
          method: "DELETE",
          url: `${BaseUrl}/like/${like_obj[0].id}`,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = axios({
          method: "post",
          url: `${BaseUrl}/like/`,
          data: { content_id: id },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      response.then((data) => {
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
    setReloading(!reloading);
  };

  React.useEffect(() => {
    SetEditPost(user.id === post?.creator.user_info.user.id ? true : false);
    setLikes(post?.likes);
    setComments(post?.comments);
  }, [id, post, reloading]);

  // React.useEffect(() => {

  //   setLikes(post?.likes);
  // }, [id, post, reloading]);

  React.useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.user_info.user.id === user?.id) !== -1
      ),
    [likes]
  );

  React.useEffect(() => {
    var channel = pusher.subscribe("comment-channel");
    channel.bind("newComment", function (data) {
      var res = data.comment;

      if (Number(res.content_id) === post?.id) {
        setMessage(res);
      }
    });
  }, []);

  React.useEffect(() => {
    if (Object.keys(message).length > 0) {
      setComments((prev) => [message, ...prev]);
    }
  }, [message]);

  return (
    <div className={classes.allposts}>
      <div className={classes.postCard}>
        <Box className={classes.accInfo}>
          <Avatar
            className={classes.avatar}
            src={getFullUrl(post?.creator.user_info.profile_image)}
            alt="avatar"
            component="Link"
          />
          <h4>{message?.content_id}</h4>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: "8px",
            }}
          >
            <Typography
              variant="h6"
              style={{
                fontWeight: "400px",
                textAlign: "left",
                marginLeft: "0px",
                fontSize:"18px"
              }}
              // component="h3"
            >
              {post?.creator.user_info.user.name}
            </Typography>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {(post?.created_at && moment(post?.created_at).fromNow(true)) ||
                ""}{" "}
              {"|"}
              <span style={{ marginLeft: "4px" }}>
                {Number(post?.type) === 3 && <SiOpenaccess />}
                {Number(post?.type) === 2 && <HiUserGroup />}
                {Number(post?.type) === 1 && <MdOutlinePublic />}
              </span>
            </span>
          </Box>
        </Box>

        {/* post info */}
        <Box className={classes.postInfo}>
          {/* image */}
          {newimgs.length > 0 && (
            <Box className={classes.uploadFile}>
              {/* file upload are include */}

              <ImageGrid images={newimgs} />
              {/* file upload are include end */}
            </Box>
          )}

          {/*  audio */}
          {post?.audio && (
            <Box className={classes.uploadFile}>
              {/* file upload are include */}

              <Audio audio={getFullUrl(post?.audio)} />
              {/* file upload are include end */}
            </Box>
          )}

          {/*  video */}
          {post?.video && (
            <Box className={classes.uploadFile}>
              {/* file upload are include */}
              <video
                src={getFullUrl(post?.video)}
                style={{ width: "100%", height: "auto" }}
                controls
              ></video>
              {/* file upload are include end */}
            </Box>
          )}

          {/*  link */}
          {post?.link !== "undefined" && (
            <Box className={classes.uploadFile}>
              {/* file upload are include */}
              <LinkPreview link={post.link} />
              {/* file upload are include end */}
            </Box>
          )}

          <span>
            {moment(post?.created_at, ["YYYY", moment.ISO_8601]).format(
              "dddd, MMM Do YYYY, ha"
            )}
          </span>
          <h5>{post?.title}</h5>

          {post?.content && (
            <React.Fragment>
              <div className={classes.postDetail}>
                <div
                  className={classes.shade}
                  style={{
                    opacity: post?.content.length > 250 ? "1" : "0",
                    display: more ? "block" : "none",
                  }}
                ></div>
                <div
                  className={classes.postContent}
                  style={{
                    overflow: more ? "hidden" : "visible",
                    height: more ? "80px" : "100%",
                    transition: "ease-in",
                  }}
                >
                  <Typography component="div" variant="title1">
                    {post?.content}
                  </Typography>
                </div>
              </div>

              {post?.content.length > 250 && (
                <span
                  className={classes.readmore}
                  onClick={() => setMore(!more)}
                >
                  {" "}
                  {more ? "continue reading" : "less reading"}
                </span>
              )}
            </React.Fragment>
          )}

          {/*  poll */}
          {post?.poll_options.length >= 1 && <PollOption post={post} />}
          <Button
            component={Link}
            to={"/creators/" + post?.creator?.user_info?.profile_url}
            variant="contained"
            style={{
              display: "block",
              backgroundColor: "rgb(245,244,242)",
              boxShadow: "none",
              color: "#444",
              marginTop: "24px",
            }}
          >
            announcement
          </Button>
        </Box>

        {/*option bts*/}
        <Box className={classes.btnOptions}>
          <Box className={classes.tools}>
            {liked ? (
              <IconButton aria-label="Example" onClick={postLiked}>
                <FavoriteOutlinedIcon fontSize="large" sx={{ color: "red" }} />
              </IconButton>
            ) : (
              <IconButton aria-label="Example" onClick={postLiked}>
                <FavoriteBorderIcon fontSize="large" />
              </IconButton>
            )}

            <IconButton aria-label="Example" onClick={handelPopLinkshare}>
              <IosShareIcon fontSize="large" />
            </IconButton>
            <Popover
              id={id}
              open={openLinkShare}
              anchorEl={popanchorEl}
              onClose={handlePopClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box
                sx={{
                  border: "1px solid rgb(229,227,221)",
                  p: 1,
                  bgcolor: "background.paper",
                  borderRadius: "4px",
                }}
              >
                {`${FrontEndBaseUrl}/post-detail/${id}`}
              </Box>
            </Popover>

            {editPost && (
              <IconButton aria-label="Example" onClick={editPostHandle}>
                <EditIcon fontSize="large" />
              </IconButton>
            )}

            <IconButton aria-label="Example">
              <MoreHorizIcon fontSize="large" />
            </IconButton>
          </Box>
          <p>{post?.like_counts} Likes</p>
        </Box>
      </div>
      <Divider />
      {/* comment section start */}
      <div className={classes.commentSection}>
        <Box className={classes.commentInfo}>
          <a href="#" onClick={loadmorecomment}>
            Load more comments
          </a>
          <span>
            {comments.length === 0
              ? 0
              : comments.length < limit.comment
              ? comments.length
              : limit.comment}{" "}
            of {comments.length}
          </span>
        </Box>

        {comments.length > 0 &&
          comments
            .slice(0, finalLimit)
            .reverse()
            .map((item, index) => {
              const { id, comment } = item;
              return (
                <Comment key={index} id={id} comment={comment} item={item} />
              );
            })}
        <CommentBox id={id} />
      </div>
    </div>
  );
};

export default Post;
