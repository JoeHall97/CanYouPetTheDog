import { NextApiRequest, NextApiResponse } from "next";
import Twitter from "twitter-v2";
import _ from "lodash";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const client = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY!,
			consumer_secret: process.env.TWITTER_CONSUMER_SECERT!,
			access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY!,
			access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECERT!,
		});

		// TWITTER V2 API
		// iterate through timeline, find relevant tweet (if it exists), return it
		// else, return error
		let { data } = await client.get("users/1102974090581864448/tweets", {
			"tweet.fields": "text",
			exclude: "retweets,replies",
		});
		// console.log(data);
		_.map(data, (tweet) => {
			if (tweet.text.toLowerCase().includes("valheim")) {
				return res.status(200).json({ data: tweet });
			}
		});
		res.status(500).json({ statusCode: 500, message: "Tweets not found." });
		// res.status(200).json({ data: data });
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default handler;
