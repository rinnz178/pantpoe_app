/** @format */

import * as React from "react";

import { echo } from "../server/server";
import { useParams, useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Popover from "@mui/material/Popover";
import Badge from "@mui/material/Badge";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Avatar, Button, Divider, IconButton, Link } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageGrid from "./../components/Gridview";
import { usePostContext } from "../context/PostContext";
import { useAuthContext } from "../context/AuthContext";
import { getFullUrl, FrontEndBaseUrl } from "../helpers/Constant";
import { Audio } from "./Audio";
import LinkPreview from "./LinkPreview";
import moment from "moment";
import { SiOpenaccess } from "react-icons/si";
import { MdOutlinePublic } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";

import PollOption from "./PollOption";
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
    marginBottom: "16px",
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
      fontWeight: "800",
      marginLeft: "16px",
      fontSize: "1.2rem",
      marginBottom: "2px",
      marginTop: "0px",
    },

    "& span": {
      display: "flex",
      padding: "0px",
      justifyContent: "start",
      marginLeft: "16px",
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
const PostDetailModel = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const { user: authUser } = useAuthContext();
  // const [post, setPost] = React.useState({});
  const {
    LikeHandle,
    RemoveLike,
    CommentCreate,
    ReplyCreate,
    CommentDelete,
    ReplyDelete,
    CommentUpdate,
    ReplyUpdate,
    CommentLikeHandle,
    RemoveCommentLikeHandle,
    pollAction,
  } = usePostContext();

  //  new add state
  const [showReply, setShowReply] = React.useState(0);
  const [editComment, setEditComment] = React.useState(0);
  const [editCommentText, setEditCommentText] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [reply, setReply] = React.useState("");

  // const [urlData, setUrlData] = React.useState({});

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
  // new add end

  // end here too

  // console.log(newimgs);

  const classes = useStyles();
  const [more, setMore] = React.useState(true);
  /*const showMore = (e) => {
    e.preventDefault();
    setMore(!more);
  };*/

  // for link pop up
  const [popanchorEl, setPopAnchorEl] = React.useState(null);
  // const [selectedPoll, setSelectedPoll] = React.useState(0);

  const handelPopLinkshare = (event) => {
    // console.log('helo');
    setPopAnchorEl(popanchorEl ? null : event.currentTarget);
  };

  const handlePopClose = () => {
    setPopAnchorEl(null);
  };

  const openLinkShare = Boolean(popanchorEl);
  // const shareid = openLinkShare ? "simple-popper" : undefined;

  // start here
  const {
    link,
    audio,
    video,
    image,
    title,
    content,
    like_counts,
    id: postid,
    likes,
    comments,
    created_at,
    poll_options,
    type,
    creator: {
      user_info: {
        user: { id: creator_id },
      },
    },
  } = props.post;
  const { profile_image, user } = props.post.creator.user_info;
  const { name } = user;

  //  console.log(link);
  let newimgs = [];
  // let linkobj = { image: "", url: "", description: "", title: "" };

  const islike = likes.some(function (el) {
    let condi = el.user_info.user.id === authUser.id;
    console.log(condi);
    return condi;
  });

  const deleteLike = (postid) => {
    const comment = likes.filter(
      (like) => like.user_info.user.id === authUser.id
    );

    RemoveLike(comment[0].id);
  };

  // console.log(image);

  if (image === null && typeof image === "object") {
    newimgs = [];
  } else {
    const images = JSON.parse(image);

    newimgs = images.map((img) => getFullUrl(img));
  }
  // end here

  // action start

  /* const inputHandle = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    //   setCommentValue(prev => ({
    //     ...prev,
    //     [name]:value
    //  }))
  };*/
  const handleArea = (e) => {
    const { name, value } = e.target;
    if (name === "comment") {
      setComment(value);
    }

    if (name === "reply") {
      setReply(value);
    }

    if (name === "editReply") {
      setEditReply((prev) => ({
        ...prev,
        reply: value,
      }));
    }

    if (name === "editComment") {
      setEditCommentText(value);
    }
  };

  const submitCommentLine = (id) => {
    // console.log(id);

    let formData = new FormData();
    formData.append("content_id", id);
    formData.append("comment", comment);
    CommentCreate(formData);
    props.changeData();
    setComment("");
  };

  const submitReplyline = (comment_id) => {
    // console.log(comment_id);
    let formData = new FormData();
    formData.append("comment_id", comment_id);
    formData.append("comment", reply);
    ReplyCreate(formData);
    setReply("");
    setShowReply(0);
    props.changeData();
  };

  const EditComment = (postid, comment_id, comment) => {
    console.log(comment_id, comment);
    setEditComment(comment_id);
    setEditCommentText(comment);
  };

  const cancelUpdateComment = () => {
    setEditComment("");
  };

  const updateComment = (postid, comment_id) => {
    let formData = new FormData();
    formData.append("content_id", postid);
    formData.append("comment", editCommentText);
    formData.append("_method", "PUT");
    CommentUpdate(formData, comment_id);
    setComment("");
    setEditComment("");
    props.changeData();
  };

  const editReplyHandle = (comment_id, reply_id, reply) => {
    setEditReply((prev) => ({
      commentId: comment_id,
      replyId: reply_id,
      reply: reply,
    }));
  };

  const cancelUpdateReply = () => {
    setReply("");
    setEditReply({
      commentId: "",
      replyId: "",
    });
  };
  const updateReply = (comment_id, reply_id) => {
    let formData = new FormData();
    formData.append("comment_id", comment_id);
    formData.append("comment", editReply.reply);
    formData.append("_method", "PUT");
    ReplyUpdate(formData, reply_id);
    setEditReply({
      commentId: "",
      replyId: "",
      reply: "",
    });
    props.changeData();
  };

  const loadmorecomment = (e) => {
    e.preventDefault();
    setLimit((prev) => ({
      ...prev,
      comment: prev.comment + 5,
    }));
  };

  // const handlePolloption = (pollid) => {
  //   pollAction(pollid);
  //   props.changeData();
  // };

  const editPost = (postid) => {
    // console.log(postid);
    history.push("/post-edit/" + postid);
  };

  // React.useEffect(() => {
  //   let getdata = true;
  //   if (getdata) {
  //     getPostByid(postid);
  //   }

  //   return getdata = false;
  // }, []);

  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d sec",
      m: "a minute",
      mm: "%d min",
      h: "an hour",
      hh: "%d hr",
      d: "%d d",
      dd: "%d d",
      w: "a week",
      ww: "%d w",
      M: "a month",
      MM: "%d m",
      y: "a year",
      yy: "%d yr",
    },
  });

  React.useEffect(() => {
    // echo
    //   .channel("comment-channel")
    //   .listen(".newComment", (data) => {
    //     console.log("rumman");
    //     console.log(data);
    //   })
    //   .subscribed((e) => {
    //     console.log(e);
    //   })
    //   .error((e) => console.log(e, "error"));
  });

  return (
    <div className={`${classes.allposts} `}>
      {/* account info and to like btn */}
      <div className={classes.postCard}>
        <Box className={classes.accInfo}>
          <Avatar
            className={classes.avatar}
            alt="Remy Sharp"
            src={getFullUrl(profile_image)}
          />
          <Box>
            <h3>{name}</h3>
            <span>
              {moment(created_at).fromNow(true)} .
              {type === 3 && <SiOpenaccess />}
              {type === 2 && <HiUserGroup />}
              {type === 1 && <MdOutlinePublic />}
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
          {audio && (
            <Box className={classes.uploadFile}>
              {/* file upload are include */}

              <Audio audio={getFullUrl(audio)} />
              {/* file upload are include end */}
            </Box>
          )}

          {/*  video */}
          {video && (
            <Box className={classes.uploadFile}>
              {/* file upload are include */}
              <video
                src={getFullUrl(video)}
                style={{ width: "100%", height: "auto" }}
                controls
              ></video>
              {/* file upload are include end */}
            </Box>
          )}

          {/*  link */}
          {link !== "undefined" && (
            <Box className={classes.uploadFile}>
              {/* file upload are include */}
              <LinkPreview link={link} />
              {/* file upload are include end */}
            </Box>
          )}

          <span>
            {moment(created_at, ["YYYY", moment.ISO_8601]).format(
              "dddd, MMM Do YYYY, ha"
            )}
          </span>
          <h2>{title}</h2>

          {content && (
            <React.Fragment>
              <div className={classes.postDetail}>
                <div
                  className={classes.shade}
                  style={{
                    opacity: content.length > 250 ? "1" : "0",
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
                  <p>{content}</p>
                </div>
              </div>

              {content.length > 250 && (
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

          {/* <span
                      className={classes.readmore}
                      onClick={() => gotoDetail(postid)}>
                      {more ? "continue reading" : "less reading"}
                    </span> */}

          {/*  poll */}
          {poll_options.length >= 1 && <PollOption post={props.post} />}
          <Button
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
        <Box className={classes.btnOptions}>
          <Box clssName={classes.tools}>
            {islike || (
              <IconButton
                aria-label="Example"
                onClick={() => {
                  LikeHandle(postid);
                  props.changeData();
                }}
              >
                <FavoriteBorderIcon fontSize="large" />
              </IconButton>
            )}

            {islike && (
              <IconButton
                aria-label="Example"
                onClick={() => {
                  deleteLike(postid);
                  props.changeData();
                }}
              >
                <FavoriteOutlinedIcon fontSize="large" sx={{ color: "red" }} />
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
                {`${FrontEndBaseUrl}post-detail/${postid}`}
              </Box>
            </Popover>

            {/*  post edit */}

            {authUser.id === creator_id && (
              <IconButton aria-label="Example" onClick={() => editPost(postid)}>
                <EditIcon fontSize="large" />
              </IconButton>
            )}
            {/* post edit end */}
            <IconButton aria-label="Example">
              <MoreHorizIcon fontSize="large" />
            </IconButton>
          </Box>
          <p>{like_counts} Likes</p>
        </Box>
      </div>
      <Divider />
      {/* comment section start */}
      <div className={classes.commentSection}>
        <Box className={classes.commentInfo}>
          <Link href="#" onClick={loadmorecomment}>
            Load more comments
          </Link>
          <span>
            {comments.length === 0
              ? 0
              : comments.length < limit.comment
              ? comments.length
              : limit.comment}{" "}
            of {comments.length}
          </span>
        </Box>

        {comments
          .slice(0, finalLimit)
          .reverse()
          .map((item, i) => {
            const {
              user_info,
              comment: saying,
              comment_replies: replies,
              id: comment_id,
              comment_like_counts,
              comment_likes,
              created_at,
            } = item;
            const { profile_image: cProfile } = user_info;
            const { name, id: commenter_id } = user_info.user;
            const iscommentlike = comment_likes.some(function (el) {
              return el.user_info.user.id === authUser.id;
            });

            const CommentlikeRemoveHandle = (comment_id) => {
              const commentlike = comment_likes.filter(
                (like) =>
                  like.comment_id === comment_id &&
                  like.user_info.user.id === authUser.id
              );

              RemoveCommentLikeHandle(commentlike[0].id);
            };
            return (
              <Box key={i} className={classes.Comments}>
                <div className={classes.MainComment}>
                  <div className={classes.content}>
                    <Avatar alt={name} src={getFullUrl(cProfile)} />
                    {editComment !== comment_id ? (
                      <Box
                        className={classes.commentDetail}
                        style={{ width: `-webkit-fill-available` }}
                      >
                        <h4>{name}</h4>
                        <p>{saying}</p>
                        {!iscommentlike ? (
                          <IconButton
                            onClick={() => {
                              CommentLikeHandle(comment_id);
                              props.changeData();
                            }}
                          >
                            <StyledBadge
                              badgeContent={comment_like_counts}
                              color="secondary"
                            >
                              <FavoriteBorderIcon fontSize="small" />
                            </StyledBadge>
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => {
                              CommentlikeRemoveHandle(comment_id);
                              props.changeData();
                            }}
                          >
                            <StyledBadge
                              badgeContent={comment_like_counts}
                              color="secondary"
                            >
                              <FavoriteOutlinedIcon fontSize="small" />
                            </StyledBadge>
                          </IconButton>
                        )}
                        <IconButton
                          aria-label="Example"
                          onClick={() => setShowReply(comment_id)}
                        >
                          <ChatBubbleOutlineIcon fontSize="small" />
                        </IconButton>

                        {authUser.id === commenter_id && (
                          <IconButton
                            aria-label="Example"
                            onClick={() =>
                              EditComment(postid, comment_id, saying)
                            }
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}

                        {authUser.id === commenter_id && (
                          <IconButton
                            aria-label="Example"
                            onClick={() => {
                              CommentDelete(comment_id);
                              props.changeData();
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    ) : (
                      <Box
                        className={classes.commentDetail}
                        style={{ width: `-webkit-fill-available` }}
                      >
                        <h4>{name}</h4>
                        {/*  comment input handleing start  */}
                        <div style={{ marginRight: "8px" }}>
                          <TextareaAutosize
                            // onKeyPress={enterCommentLine}
                            value={editCommentText}
                            name="editComment"
                            id="comments-input-edit"
                            onChange={handleArea}
                            variant="outlined"
                            placeholder="Add a comment..."
                            aria-label="minimum height"
                            minRows={4}
                            style={{ width: "100%", resize: "none" }}
                          />
                          <Button
                            style={{ float: "right", marginTop: "10px" }}
                            onClick={() => updateComment(postid, comment_id)}
                            type="submit"
                            variant="outlined"
                            className="comments-button"
                            disabled={editCommentText.length > 0 ? false : true}
                          >
                            Save
                          </Button>
                          <Button
                            style={{ float: "left", marginTop: "10px" }}
                            onClick={() => cancelUpdateComment()}
                            color="secondary"
                            type="submit"
                            variant="outlined"
                            className="comments-button"
                            disabled={editCommentText.length > 0 ? false : true}
                          >
                            Cancel
                          </Button>
                        </div>
                        {/* comment input handling end */}
                      </Box>
                    )}

                    {/* comment Edit start  */}
                  </div>
                  <div className="commentTime">
                    {moment(created_at).fromNow(true)}
                  </div>
                </div>
                {/* replay start */}

                {replies.map((r, index) => {
                  const {
                    user_info,
                    comment: reply,
                    id: rid,
                    created_at: replyCreated_at,
                  } = r;
                  const { profile_image: rProfile } = user_info;
                  const { name: reply_user, id: reply_id } = user_info.user;
                  return (
                    <div key={index} className={classes.reply}>
                      <div className={classes.replyInfo}>
                        <Avatar alt={name} src={getFullUrl(rProfile)} />
                        {comment_id === editReply.commentId &&
                        rid === editReply.replyId ? (
                          <Box className={`${classes.replyDetail} `}>
                            <h4>{authUser.name}</h4>
                            {/*  reply input handleing start  */}
                            <div style={{ marginRight: "8px" }}>
                              <TextareaAutosize
                                // onKeyPress={enterCommentLine}
                                value={editReply.reply}
                                name="editReply"
                                id="comments-input"
                                onChange={handleArea}
                                variant="outlined"
                                placeholder="reply here..."
                                aria-label="minimum height"
                                minRows={2}
                                style={{ width: "100%", resize: "none" }}
                              />
                              <Button
                                style={{ float: "left", marginTop: "10px" }}
                                onClick={() => cancelUpdateReply(comment_id)}
                                type="submit"
                                variant="outlined"
                                className="comments-button"
                                color="secondary"
                                disabled={reply.length > 0 ? false : true}
                              >
                                Cancel
                              </Button>
                              <Button
                                style={{ float: "right", marginTop: "10px" }}
                                onClick={() => updateReply(comment_id, rid)}
                                type="submit"
                                variant="outlined"
                                className="comments-button"
                                disabled={reply.length > 0 ? false : true}
                              >
                                Save
                              </Button>
                            </div>
                            {/* reply input handling end */}
                          </Box>
                        ) : (
                          <Box className={classes.replyDetail}>
                            <h4>{reply_user}</h4>
                            <p>{reply}</p>

                            {authUser.id === reply_id && (
                              <IconButton
                                aria-label="Example"
                                onClick={() =>
                                  editReplyHandle(comment_id, rid, reply)
                                }
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            )}
                            {authUser.id === reply_id && (
                              <IconButton
                                aria-label="Example"
                                onClick={() => {
                                  ReplyDelete(rid);
                                  props.changeData();
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            )}
                            {/* <IconButton aria-label='Example'>
                                                    <FavoriteBorderIcon fontSize='small' />{' '}
                                                    <span className={classes.count}>3</span>
                                                  </IconButton>
                                                  <IconButton aria-label='Example'>
                                                    <ChatBubbleOutlineIcon fontSize='small' />
                                                  </IconButton> */}
                          </Box>
                        )}
                      </div>
                      <div>{moment(replyCreated_at).fromNow(true)}</div>
                    </div>
                  );
                })}

                {/* comment add here */}
                <div
                  className={`${
                    comment_id === showReply ? classes.reply : classes.hideReply
                  }`}
                >
                  <div className={classes.replyInfo}>
                    <Avatar
                      alt={`${authUser.name}`}
                      src={`${getFullUrl(authUser.profile_image)}`}
                    />

                    <Box className={`${classes.replyDetail} `}>
                      <h4>{authUser.name}</h4>
                      {/*  reply input handleing start  */}
                      <div style={{ marginRight: "8px" }}>
                        <TextareaAutosize
                          // onKeyPress={enterCommentLine}

                          name="reply"
                          id="comments-input"
                          onChange={handleArea}
                          variant="outlined"
                          placeholder="reply here..."
                          aria-label="minimum height"
                          minRows={2}
                          style={{ width: "100%", resize: "none" }}
                        />
                        <Button
                          style={{ float: "right", marginTop: "10px" }}
                          onClick={() => submitReplyline(comment_id)}
                          type="submit"
                          variant="outlined"
                          className="comments-button"
                          disabled={reply.length > 0 ? false : true}
                        >
                          Reply
                        </Button>
                      </div>
                      {/* reply input handling end */}
                    </Box>
                  </div>
                  <div></div>
                </div>
              </Box>
            );
          })}
        <Box className={classes.Comments}>
          <div className={classes.MainComment}>
            <div className={classes.content}>
              <Avatar
                alt={authUser.name}
                src={`${getFullUrl(authUser.profile_image)}`}
              />

              <Box
                className={classes.commentDetail}
                style={{ width: `-webkit-fill-available` }}
              >
                <h4>{authUser.name}</h4>
                {/*  comment input handleing start  */}
                <div style={{ marginRight: "3px" }}>
                  <TextareaAutosize
                    // onKeyPress={enterCommentLine}
                    value={comment}
                    name="comment"
                    id="comments-input"
                    onChange={handleArea}
                    variant="outlined"
                    placeholder="Add a comment..."
                    aria-label="minimum height"
                    minRows={3}
                    style={{ width: "100%", resize: "none" }}
                  />
                  <Button
                    style={{ float: "right", marginTop: "10px" }}
                    onClick={() => submitCommentLine(postid)}
                    type="submit"
                    variant="outlined"
                    className="comments-button"
                    disabled={comment.length > 0 ? false : true}
                  >
                    Post
                  </Button>
                </div>
                {/* comment input handling end */}
                {/* <IconButton aria-label='Example' >
                            <FavoriteBorderIcon fontSize='small' />
                          </IconButton>
                          <IconButton aria-label='Example'>
                            <ChatBubbleOutlineIcon fontSize='small' />
                          </IconButton> */}
              </Box>
            </div>
            <div className="commentTime"></div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default PostDetailModel;
