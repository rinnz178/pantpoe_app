{
  /*  posts starting from  one post start*/
}
<div className={`${classes.allposts} `}>
  {/* account info and to like btn */}
  <div className={classes.postCard}>
    <Box className={classes.accInfo}>
      <Avatar
        className={classes.avatar}
        alt="Remy Sharp"
        src="https://upload.wikimedia.org/wikipedia/commons/4/43/Globe_Amaranth_Flower_Gomphrena_Globosa_%E5%8D%83%E6%97%A5%E7%B4%85_%E3%82%BB%E3%83%B3%E3%83%8B%E3%83%81%E3%82%B3%E3%82%A6_%28223201679%29.jpeg"
      />
      <h3>Shirtaloon(Travis Deve)</h3>
    </Box>

    {/* post info */}
    <Box className={classes.postInfo}>
      <Box className={classes.uploadFile}>
        {/* file upload are include */}
        <ImageGrid images={postPhoto} />
        {/* file upload are include end */}
      </Box>
      <span>Oct 23,2020 at 5:34 AM</span>
      <h2>Buring Out</h2>
      <div className={classes.postDetail}>
        <div
          className={classes.shade}
          style={{
            opacity: more ? "1" : "0",
          }}
        ></div>
        <div
          className={classes.postContent}
          style={{
            overflow: more ? "hidden" : "scroll",
            height: more ? "80px" : "100%",
            transition: "ease-in",
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            maiores! Repellendus atque ipsam dolores quidem, voluptates aut
            unde, fugit, Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Perspiciatis reprehenderit voluptatibus corporis natus harum
            architecto perferendis odio error eius in! Rem excepturi harum
            officiis necessitatibus totam vel nobis, quidem dolores. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Voluptate, maiores!
            Repellendus atque ipsam dolores quidem, voluptates aut unde, fugit,
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis reprehenderit voluptatibus corporis natus harum
            architecto perferendis odio error eius in! Rem excepturi harum
            officiis necessitatibus totam vel nobis, quidem dolores. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Voluptate, maiores!
            Repellendus atque ipsam dolores quidem, voluptates aut unde, fugit,
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis reprehenderit voluptatibus corporis natus harum
            architecto perferendis odio error eius in! Rem excepturi harum
            officiis necessitatibus totam vel nobis, quidem dolores.
          </p>
        </div>
      </div>

      {/* <span className={classes.readmore} onClick={() => setMore(!more)}> */}
      <span className={classes.readmore} onClick={() => gotoDetail()}>
        {more ? "continue reading" : "less reading"}
      </span>
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
        <IconButton aria-label="Example">
          <FavoriteBorderIcon fontSize="large" />
        </IconButton>
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
            {`${FrontEndBaseUrl}/post-detail/1`}
          </Box>
        </Popover>

        <IconButton aria-label="Example">
          <MoreHorizIcon fontSize="large" />
        </IconButton>
      </Box>
      <p>106 Likes</p>
    </Box>
  </div>
  <Divider />
  {/* comment section start */}
  <div className={classes.commentSection}>
    <Box className={classes.commentInfo}>
      <a>Load more comments</a>
      <span>2 of 28</span>
    </Box>
    {/* main comment start */}
    <Box className={classes.Comments}>
      <div className={classes.MainComment}>
        <div className={classes.content}>
          <Avatar
            alt="helo world"
            src="https://images.unsplash.com/photo-1600037402813-d7f103d0cd05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=327&q=80"
          />

          <Box className={classes.commentDetail}>
            <h4>Tyler Schibig</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
              dolorum, natus inventore consectetur dicta amet.
            </p>
            <IconButton aria-label="Example">
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Example">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </div>
        <div className="commentTime">1mo</div>
      </div>
      {/* replay start */}
      <div className={classes.reply}>
        <div className={classes.replyInfo}>
          <Avatar
            alt="helo world"
            src="https://images.unsplash.com/photo-1597089542047-b9873d82d8ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
          />

          <Box className={classes.replyDetail}>
            <h4>Tyler Schibig</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
              dolorum, natus inventore consectetur dicta amet.
            </p>
            <IconButton aria-label="Example">
              <FavoriteBorderIcon fontSize="small" />{" "}
              <span className={classes.count}>3</span>
            </IconButton>
            <IconButton aria-label="Example">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </div>
        <div>23s</div>
      </div>

      <div className={classes.reply}>
        <div className={classes.replyInfo}>
          <Avatar
            alt="helo world"
            src="https://images.unsplash.com/photo-1597089542047-b9873d82d8ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
          />

          <Box className={classes.replyDetail}>
            <h4>Tyler Schibig</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
              dolorum, natus inventore consectetur dicta amet.
            </p>
            <IconButton aria-label="Example">
              <FavoriteBorderIcon fontSize="small" />{" "}
              <span className={classes.count}>3</span>
            </IconButton>
            <IconButton aria-label="Example">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </div>
        <div>23s</div>
      </div>
    </Box>
    <Box className={classes.Comments}>
      <div className={classes.MainComment}>
        <div className={classes.content}>
          <Avatar
            alt="helo world"
            src="https://5.imimg.com/data5/AB/RM/HJ/SELLER-96982249/button-rose-500x500.jpg"
          />

          <Box className={classes.commentDetail}>
            <h4>Tyler Schibig</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
              dolorum, natus inventore consectetur dicta amet.
            </p>
            <IconButton aria-label="Example">
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Example">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </div>
        <div className="commentTime">1mo</div>
      </div>
      {/* replay start */}
      {/* <div className={classes.reply}>
                <div className={classes.replyInfo}>
                  <Avatar
                    alt='helo world'
                    src='https://images.unsplash.com/photo-1597089542047-b9873d82d8ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'
                  />

                  <Box className={classes.replyDetail}>
                    <h4>Tyler Schibig</h4>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Delectus dolorum, natus inventore consectetur dicta amet.
                    </p>
                    <IconButton aria-label='Example'>
                      <FavoriteBorderIcon fontSize='small' />{' '}
                      <span className={classes.count}>3</span>
                    </IconButton>
                    <IconButton aria-label='Example'>
                      <ChatBubbleOutlineIcon fontSize='small' />
                    </IconButton>
                  </Box>
                </div>
                <div>23s</div>
              </div>

              <div className={classes.reply}>
                <div className={classes.replyInfo}>
                  <Avatar
                    alt='helo world'
                    src='https://images.unsplash.com/photo-1597089542047-b9873d82d8ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'
                  />

                  <Box className={classes.replyDetail}>
                    <h4>Tyler Schibig</h4>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Delectus dolorum, natus inventore consectetur dicta amet.
                    </p>
                    <IconButton aria-label='Example'>
                      <FavoriteBorderIcon fontSize='small' />{' '}
                      <span className={classes.count}>3</span>
                    </IconButton>
                    <IconButton aria-label='Example'>
                      <ChatBubbleOutlineIcon fontSize='small' />
                    </IconButton>
                  </Box>
                </div>
                <div>23s</div>
              </div> */}
    </Box>
  </div>
</div>;
{
  /*  posts ending here */
}
{
  /*  posts starting from  one post start*/
}
<div className={`${classes.allposts} `}>
  {/* account info and to like btn */}
  <div className={classes.postCard}>
    <Box className={classes.accInfo}>
      <Avatar
        className={classes.avatar}
        alt="Remy Sharp"
        src="https://upload.wikimedia.org/wikipedia/commons/4/43/Globe_Amaranth_Flower_Gomphrena_Globosa_%E5%8D%83%E6%97%A5%E7%B4%85_%E3%82%BB%E3%83%B3%E3%83%8B%E3%83%81%E3%82%B3%E3%82%A6_%28223201679%29.jpeg"
      />
      <h3>Shirtaloon(Travis Deve)</h3>
    </Box>

    {/* post info */}
    <Box className={classes.postInfo}>
      <span>Oct 23,2020 at 5:34 AM</span>
      <h2>Buring Out</h2>
      <div className={classes.postDetail}>
        <div
          className={classes.shade}
          style={{
            opacity: more ? "1" : "0",
          }}
        ></div>
        <div
          className={classes.postContent}
          style={{
            overflow: more ? "hidden" : "scroll",
            height: more ? "80px" : "100%",
            transition: "ease-in",
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            maiores! Repellendus atque ipsam dolores quidem, voluptates aut
            unde, fugit, Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Perspiciatis reprehenderit voluptatibus corporis natus harum
            architecto perferendis odio error eius in! Rem excepturi harum
            officiis necessitatibus totam vel nobis, quidem dolores. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Voluptate, maiores!
            Repellendus atque ipsam dolores quidem, voluptates aut unde, fugit,
            Lorem ipsum dolor sit amet consectetur
          </p>
        </div>
      </div>
      <span>{more ? "continue reading" : "less reading"}</span>
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
        <IconButton aria-label="Example">
          <FavoriteBorderIcon fontSize="large" />
        </IconButton>
        <IconButton aria-label="Example">
          <IosShareIcon fontSize="large" />
        </IconButton>
        <IconButton aria-label="Example">
          <MoreHorizIcon fontSize="large" />
        </IconButton>
      </Box>
      <p>106 Likes</p>
    </Box>
  </div>
  <Divider />
  {/* comment section start */}
  <div className={classes.commentSection}>
    <Box className={classes.commentInfo}>
      <a href="#">Load more comments</a>
      <span>2 of 28</span>
    </Box>
    {/* main comment start */}
    <Box className={classes.Comments}>
      <div className={classes.MainComment}>
        <div className={classes.content}>
          <Avatar
            alt="helo world"
            src="https://images.unsplash.com/photo-1600037402813-d7f103d0cd05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=327&q=80"
          />

          <Box className={classes.commentDetail}>
            <h4>Tyler Schibig</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
              dolorum, natus inventore consectetur dicta amet.
            </p>
            <IconButton aria-label="Example">
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Example">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </div>
        <div className="commentTime">1mo</div>
      </div>
      {/* replay start */}
      <div className={classes.reply}>
        <div className={classes.replyInfo}>
          <Avatar
            alt="helo world"
            src="https://images.unsplash.com/photo-1597089542047-b9873d82d8ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
          />

          <Box className={classes.replyDetail}>
            <h4>Tyler Schibig</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
              dolorum, natus inventore consectetur dicta amet.
            </p>
            <IconButton aria-label="Example">
              <FavoriteBorderIcon fontSize="small" />{" "}
              <span className={classes.count}>3</span>
            </IconButton>
            <IconButton aria-label="Example">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </div>
        <div>23s</div>
      </div>

      <div className={classes.reply}>
        <div className={classes.replyInfo}>
          <Avatar
            alt="helo world"
            src="https://images.unsplash.com/photo-1597089542047-b9873d82d8ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
          />

          <Box className={classes.replyDetail}>
            <h4>Tyler Schibig</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
              dolorum, natus inventore consectetur dicta amet.
            </p>
            <IconButton aria-label="Example">
              <FavoriteBorderIcon fontSize="small" />{" "}
              <span className={classes.count}>3</span>
            </IconButton>
            <IconButton aria-label="Example">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </div>
        <div>23s</div>
      </div>
    </Box>
    <Box className={classes.Comments}>
      <div className={classes.MainComment}>
        <div className={classes.content}>
          <Avatar
            alt="helo world"
            src="https://5.imimg.com/data5/AB/RM/HJ/SELLER-96982249/button-rose-500x500.jpg"
          />

          <Box className={classes.commentDetail}>
            <h4>Tyler Schibig</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
              dolorum, natus inventore consectetur dicta amet.
            </p>
            <IconButton aria-label="Example">
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Example">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </div>
        <div className="commentTime">1mo</div>
      </div>
    </Box>
  </div>
</div>;
{
  /*  posts ending here */
}
