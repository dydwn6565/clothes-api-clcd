const express = require("express");

const router = express.Router();
const items = require("./itemsJson.json");
const uuid = require("uuid").v4;


const stripe = require("stripe")(
  "sk_test_51KWFQPG6LrFQPHnX5IVqUFMV9ANjh2n6xoxaxFllzIveyHtJxgs40KYOxTVKMuTpRaWdrx4RiZ65aGY96IiOsUhA00GQXEfO4j"
);
router.get("/", async (req, res) => {
  try {
    res.json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.get("/outer", async (req, res) => {
  try {
    res.json(items["outer"]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.get("/outer/hoody", async (req, res) => {
  try {
    res.json(items["outer"]["hoody"]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.get("/pants", async (req, res) => {
  try {
    res.json(items["pants"]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.get("/pants/denim pants", async (req, res) => {
  try {
    res.json(items["pants"]["denim pants"]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.get("/pants/slacks", async (req, res) => {
  try {
    res.json(items["pants"]["slacks"]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.get("/ranking", async (req, res) => {
  try {
    res.json(items["ranking"]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.get("/recommend", async (req, res) => {
  try {
    res.json(items["recommend"]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.get("/searched", async (req, res) => {
  try {
    const keywords = req.query.keyword.split(",");

    const matchedItemFromHoody = items.outer.hoody.filter((hoody) =>
      hoody.keyword.includes(...keywords)
    );

    const matchedItemFromCardigan = items.outer.cardigan.filter((cardigan) =>
      cardigan.keyword.includes(...keywords)
    );
    const matchedItemFromDenim = items.pants["denim pants"].filter((denim) =>
      denim.keyword.includes(...keywords)
    );
    const matchedItemFromSlack = items.pants.slacks.filter((slacks) =>
      slacks.keyword.includes(...keywords)
    );
    const searchedItemList = Object.assign(
      matchedItemFromHoody,
      matchedItemFromCardigan,
      matchedItemFromDenim,
      matchedItemFromSlack
    );

    res.status(200).json(searchedItemList);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.post("/checkout", async (req, res) => {
  console.log(parseInt(req.body.items.orderState[0].discounted_price));
  console.log("hit");
  // return res.send({ success: "success" });
  let error, status;
  try {
    const { product, token } = req.body;
    const key = uuid();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "https://myshoppingmall.vercel.app//confirm",
      cancel_url: "https://myshoppingmall.vercel.app//order",
      line_items: req.body.items.orderState?.map((item) => {
        return {
          price_data: {
            currency: "cad",
            product_data: {
              name: item.name,
            },
            unit_amount: item.discounted_price * 100,
          },
          quantity: item.quantity,
        };
      }),
    });

   return res.status(200).send({ url: session.url });
    // console.log("Charge", { charge });
    // status: "success";
  } catch (error) {
    console.log(error);
    // status: "failure";
  }
});

module.exports = router;
