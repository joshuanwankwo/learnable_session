const main = async () => {

    const [owner, randomPerson] = await hre.ethers.getSigners();
    const helloContractFactory = await hre.ethers.getContractFactory("HelloWorld");
    const helloContract = await helloContractFactory.deploy();
    await helloContract.deployed();

    console.log("Contract deployed to:", helloContract.address);
    console.log("Contract deployed by:", owner.address);

    const message = await helloContract.getMessage();
    console.log("Message is: ", message);

    await helloContract.getTotal();

    const firstHello = await helloContract.sayHello();
    await firstHello.wait();
    await helloContract.getTotal();

    const secondHello = await helloContract.connect(randomPerson).sayHello();
    await secondHello.wait();
    await helloContract.getTotal();

  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();