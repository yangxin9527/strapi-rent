"use strict";

/**
 * posts-report service.
 */

module.exports = {
  postsReport: async () => {
    try {
      // fetching data
      const entries = await strapi.entityService.findMany("api::room.room", {
        fields: ["id", "createdAt", "name"],
        // populate: {
        //   author: {
        //     fields: ["name", "email"],
        //   },
        //   category: {
        //     fields: ["name"],
        //   },
        // },
      });

      // reduce the data to the format we want to return
      let entriesReduced;
      if (entries && Array.isArray(entries)) {
        entriesReduced = entries.reduce((acc, item) => {
          acc = acc || [];
          acc.push({
            ...item,
            id: item.id,
            name: item.name,
            //   title: item.title || "",
            //   category: item.category.name || "",
            publishedDate: new Date(item.createdAt).toDateString() || "",
            //   authorName: item.author?.name || "",
            //   authorEmail: item.author?.email || "",
          });
          return acc;
        }, []);
      }

      // return the reduced data
      return entriesReduced;
    } catch (err) {
      return err;
    }
  },
};
