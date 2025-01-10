import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  //await new Promise((resolve) => setTimeout(resolve, 5000));
  //throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
  //protect against sql injection
}

export async function saveMeal(meal) {
  const slug = slugify(meal.title, { lower: true });
  meal.slug = slug;
  const instructions = xss(meal.instructions);
  //meal.slug = slugify(meal.title, { lower: true }); also works

  //store image file in public folder.
  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  //write file to public dir can be done with node api fs(filesystem)
  const stream = fs.createWriteStream(`public/images/${filename}`);
  //we have to convert ouR image to a buffer image with an array buffer method needed to write the file
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving Image failed");
    }
  });

  //it is the path to the image you want to save to the db. You remove public because by default inmages will be sent to publi dir
  meal.image = `/images/${filename}`;

  db.prepare(
    `INSERT INTO meals (title, Summary, instructions, creator, creator_email, image, slug)
    VALUES(
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug)`
  ).run(meal);
}
