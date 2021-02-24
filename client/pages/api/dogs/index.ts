import { NextApiRequest, NextApiResponse } from "next";
import Twitter from "twitter-v2";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const client = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY!,
			consumer_secret: process.env.TWITTER_CONSUMER_SECERT!,
			access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY!,
			access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECERT!,
		});

		// TWITTER V1 API
		// var params = { screen_name: "nodejs" };
		// client.get("statuses/user_timeline", params, function (error, tweets, response) {
		// 	if (!error) {
		// 		res.status(200).json(tweets);
		// 	} else {
		// 		res.status(500).json({ statusCode: 500, message: error });
		// 	}
		// });

		// TWITTER V2 API
		const { data } = await client.get("users/1102974090581864448/tweets", { "tweet.fields": "text" });
		res.status(200).json({ data: data });
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default handler;
