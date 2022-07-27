const { Builder, Capabilities, By } = require("selenium-webdriver");

// We ALWAYS need to require chromedriver. We don't need to save to a variable since we just need to bring in chromedriver once and not reference it again.
require("chromedriver");

// And this next line is also the same as far as setting up Chrome goes
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeEach(async () => {
  await driver.get("http://localhost:5500/movieList/index.html");
});

afterAll(async () => {
  await driver.quit();
});

test("creating a movie", async () => {
  await driver.findElement(By.xpath("//input")).sendKeys("Beetlejuice \n");
  await driver.sleep(2000);
  const movie = await driver.findElement(By.xpath("//li"));
  const displayed = movie.isDisplayed();
  expect(displayed).toBeTruthy();
});
test("creating a movie", async () => {
  await driver.findElement(By.xpath("//input")).sendKeys("Annie \n");
  await driver.sleep(2000);
  const movie = await driver.findElement(By.xpath("//li"));
  const displayed = movie.isDisplayed();
  expect(displayed).toBeTruthy();
});
test("creating a movie", async () => {
  await driver.findElement(By.xpath("//input")).sendKeys("Newsies \n");
  await driver.sleep(2000);
  const movie = await driver.findElement(By.xpath("//li"));
  const displayed = movie.isDisplayed();
  expect(displayed).toBeTruthy();
});
test("creating a movie", async () => {
  await driver
    .findElement(By.xpath("//input"))
    .sendKeys("Electric Boogaloo \n");
  await driver.sleep(2000);
  const movie = await driver.findElement(By.xpath("//li"));
  const displayed = movie.isDisplayed();
  expect(displayed).toBeTruthy();
});

test("crossing off a movie message", async () => {
  await driver.findElement(By.xpath("//li//span")).click();
  let message = await driver.findElement(By.id("message")).getText();
  await driver.sleep(2000);
  expect(message).toBe("Beetlejuice watched!");
});

test("un-crossing off a movie message", async () => {
  await driver.findElement(By.xpath("//li//span")).click();
  let message = await driver.findElement(By.id("message")).getText();
  await driver.sleep(2000);
  expect(message).toBe("Beetlejuice added back!");
});
test("crossing off a movie", async () => {
  await driver.findElement(By.xpath("//li//span")).click();
  await driver.sleep(2000);
  let checked = await driver
    .findElement(By.xpath("//li//span"))
    .getAttribute("class");
  expect(checked).toBe("checked");
});

test("un-crossing off a movie", async () => {
  await driver.findElement(By.xpath("//li//span")).click();
  await driver.sleep(2000);
  let checked = await driver
    .findElement(By.xpath("//li//span"))
    .getAttribute("class");
  expect(checked).toBe("");
});

test("deleting a movie", async () => {
  await driver.findElement(By.id("Newsies")).click();
  await driver.sleep(2000);
  movies = await driver.findElement(By.xpath("//ul")).getText();
  movies = movies.split("x\n");
  console.log(movies);
  let existing = movies.includes("Electric Boogaloo");
  expect(existing).toBeFalsy();
});

test("deleting a movie message", async () => {
  await driver.findElement(By.id("Newsies")).click();
  let message = await driver.findElement(By.id("message")).getText();
  await driver.sleep(2000);
  expect