import { TwitterTweetEmbed } from "react-twitter-embed";

type Props = {
	tweetId: string;
};

const Tweet = ({ tweetId }: Props): JSX.Element => {
	return <TwitterTweetEmbed tweetId={tweetId} placeholder="Loading..." />;
};

export default Tweet;
