import { AppDataSource } from "./data-source";
import User from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await AppDataSource.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);
    // console.log("Loading users from the database...");
    // const users = await AppDataSource.manager.find(User);
    // console.log("Loaded users: ", users);
    // console.log(
    //   "Here you can setup and run express / fastify / any other framework."
    // );

    let user = new User();
    const userRepo = AppDataSource.getRepository(User);

    // deleting everything from user table
    await userRepo.remove(await userRepo.find());

    // CREATE OPERATION (added 2 users)
    user.name = "Pushpender";
    user.phone_name = "9354899416";
    user.country = "India";
    await userRepo.save(user);
    console.log(`User with id ${user.id} saved into DB`);

    user = new User();
    user.name = "Ajay";
    user.phone_name = "9988998899";
    user.country = "India";
    await userRepo.save(user);
    console.log(`User with id ${user.id} saved into DB`);

    // READ OPERATION
    console.log(await userRepo.find());

    // UPDATE OPERATION
    user = await userRepo.findOneBy({
      name: "Pushpender",
    });
    user.name = "Pushpender Singh";
    await userRepo.save(user);
    console.log(`User updated with id ${user.id}`);
    console.log("All Users - ");
    console.log(await userRepo.find());

    // DELETE OPERATION
    user = await userRepo.findOneBy({
      name: "Ajay",
    });
    const id = user.id;
    await userRepo.remove(user);
    console.log(`User with id ${id} deleted`);
    console.log("All Users - ");
    console.log(await userRepo.find());
  })
  .catch(error => console.log(error));
