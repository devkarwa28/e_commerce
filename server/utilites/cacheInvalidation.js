const redis = require("../config/upstashRedis")

const clearProductsCache = async () => {
    try {
        const keys = await redis.keys("products:list:*");

        if (keys.length > 0)
        {
            await redis.del(...keys);
            console.log(`Deleted ${keys.length} product cache keys`);
        }
    }
    catch (err) {
        console.log(err);
    }
}

const clearProductDetailCache = async (slug) => {
  try {
    await redis.del(`product:detail:${slug}`);
    console.log(`Deleted cache for product ${slug}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {clearProductsCache, clearProductDetailCache}