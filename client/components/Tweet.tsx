import { Tweet } from "react-twitter-widgets";

type Props = {
	tweetId: string;
};

export const DisplayTweet = ({ tweetId }: Props): JSX.Element => {
	return <Tweet tweetId={tweetId} />;
};

// export default DisplayTweet;
