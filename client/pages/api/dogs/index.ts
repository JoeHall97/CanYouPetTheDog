import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApiReturn } from "../../../interfaces";
import Twitter from "twitter-v2";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const BreakException = { message: "Found relevant tweet" };
	const canPet = "you can pet";
	const cannotPet = "you cannot pet";
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
		let { data, meta } = await client.get<TwitterApiReturn>("users/1102974090581864448/tweets", {
			"tweet.fields": "text",
			exclude: "retweets,replies",
			max_results: "100",
		});
		let next_token = meta.next_token;
		while (next_token) {
			const gameName: string = req.body.name.toLowerCase();
			data.forEach((tweet: { id: string; text: string }) => {
				if (
					tweet.text.toLowerCase().includes(gameName) &&
					(tweet.text.toLowerCase().includes(canPet) || tweet.text.toLowerCase().includes(cannotPet))
				) {
					res.status(200).json({ data: tweet });
					throw BreakException;
				}
			});
			let next_tweets = await client.get<TwitterApiReturn>("users/1102974090581864448/tweets", {
				"tweet.fields": "text",
				exclude: "retweets,replies",
				max_results: "100",
				pagination_token: next_token,
			});
			data = next_tweets.data;
			meta = next_tweets.meta;
			next_token = meta.next_token;
		}
		res.status(404).json({ message: "Tweets not found." });
	} catch (err) {
		if (err != BreakException) {
			console.log(err);
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	}
};

export default handler;
