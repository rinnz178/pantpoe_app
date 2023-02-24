/** @format */

const postReducer = (state, action) => {
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "UNSET_LOADING") {
    return {
      ...state,
      loading: false,
    };
  }
  if (action.type === "IMAGE_SELECTED") {
    return {
      ...state,
      isImageSelected: true,
      imageData: action.payload,
      formImageData: action.images,
    };
  }

  if (action.type === "VIDEO_SELECTED") {
    return {
      ...state,
      isVideoSelected: true,
      video: action.payload,
      formVideo: action.video,
    };
  }

  if (action.type === "AUDIO_SELECTED") {
    return {
      ...state,
      isAudioSelected: true,
      audio: action.payload,
      formAudio: action.audio,
    };
  }

  if (action.type === "Image_REMOVE") {
    return {
      ...state,
      isImageSelected: false,
      imageData: [],
      formImageData: [],
    };
  }
  if (action.type === "Video_REMOVE") {
    return {
      ...state,
      isVideoSelected: false,
      video: "",
      formVideo: "",
    };
  }
  if (action.type === "Audio_REMOVE") {
    return {
      ...state,
      isAudioSelected: false,
      audio: "",
      formAudio: "",
    };
  }

  //data loading

  if (action.type === "LOAD_DATA") {
    return {
      ...state,
      posts: action.payload,
    };
  }

  if (action.type === "LOAD_DATA_BY_ID") {
    return {
      ...state,
      post: action.payload,
    };
  }

  if (action.type === "Edit_Post") {
    // console.log(state);
    return { ...state, ...action.payload };
  }
  // return state
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default postReducer;
