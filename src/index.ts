import { AppDataSource } from "./data-source";
import User from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
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
