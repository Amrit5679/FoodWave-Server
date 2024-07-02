// const express = require('express');
// const cors = require('cors'); 
// const fetch = require('cross-fetch');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
 
// //For restaurant API
// app.get('/api/restaurants', async(req,res) => {
//     const { lat, lng, page_type } = req.query;
//     console.log(req.query);
//     const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=${page_type}`;
    
//     await fetch(url,{
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
//         }
//     })
//         .then(response => {
//             if(!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             res.json(data);
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).send("An error occured");
//         })
// });

// // For Menu API
// app.get('/api/menu', async (req, res) => {
//     const { 'page-type': page_type, 'complete-menu': complete_menu, lat, lng, submitAction, restaurantId } = req.query;
//     console.log(req.query);
//     const url = `https://www.swiggy.com/dapi/menu/pl?page-type=${page_type}&complete-menu=${complete_menu}&lat=${lat}&lng=${lng}&submitAction=${submitAction}&restaurantId=${restaurantId}`;

//     await fetch(url, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             res.json(data);
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).send('An error occurred');
//         });
// });

// app.get('/', (req, res) => {
//     res.json({ "test": "Welcome to FoodWave! - See Live Web URL for this Server - https://foodfire-app.netlify.app" });
// })

// app.listen(port, () => {
//     console.log(`Server is Listening on port ${port}`);
// });

const express = require("express");
const fetch = require("cross-fetch");
const cors = require("cors");
const app = express();

app.use(cors({
	origin:"*"
}));

const port = process.env.port || 3000;

app.get("/api/restaurants", (req, res) => {
	const { lat, lng } = req.query;
	console.log(req.query);
	const URL = `https://www.swiggy.com/api/seo/getListing?lat=${lat}&lng=${lng}`

	fetch(URL, {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
		},
	})
		.then((res) => {
			if (res.statsu >= 400) {
				throw new Error("Bad response from server");
			}
			return res.json();
		})
		.then((data) => {
			res.json(data);
			//console.log(res.body);
		})
		.catch((error) => console.log(error));
});

app.get("/api/restaurant/menu", (req, res) => {
	const { lat, lng, menuId } = req.query;
	const URL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${menuId}&catalog_qa=undefined&submitAction=ENTER`
	// const URL = `https://www.swiggy.com/dapi/menu/v4/full?lat=${lat}4&lng=${lng}&menuId=${menuId}`;

	fetch(URL, {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
		},
	})
		.then((res) => {
			if (res.status >= 400) {
				throw new Error("Bad request from erver");
			}
			return res.json();
		})
		.then((data) => res.json(data))
		.catch((error) => console.log(error));
});

app.get("/", (req, res) => {
	res.json({ "message:": "Server is up and running.." });
});

app.listen(port, () => {
	console.log(`Sever running at port : ${port}`);
});