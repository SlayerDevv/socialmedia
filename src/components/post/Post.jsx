import Time from "react-time-ago";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

JavascriptTimeAgo.addLocale(en);

const Post = ({
  author_picture,
  author_username,
  PostContent,
  PostAttachements,
  CreatedAt,
}) => {
  return (
    <div className="relative w-[500px] h-max bg-white rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="flex flex-col space-y-2 p-3">
        <div className="flex space-x-1">
          <img
            height={50}
            width={50}
            className="rounded-full"
            src={author_picture}
            alt="pic"
          />
          <div>
            <h1 className="font-medium">{author_username} </h1>
            <span className="text-gray-600 text-xs">
              <Time timeStyle={"round"} locale="en-US" date={CreatedAt} />
            </span>
          </div>
        </div>
        {PostContent.lenght > 0 ? <div className="flex flex-wrap">
          <p>{PostContent}</p>
          </div> : ""}
      </div>
      <div className="flex flex-wrap ">

        {PostAttachements &&
          PostAttachements.map((attachment, index) => (
            <div className="w-1/2 md:w-1/3 lg:w-1/4 p-1">
            <img
              key={index}

              src={attachment}
              alt="attachment"
            />
            </div>
          ))}
      
      </div>
    </div>
  );
};

export default Post;