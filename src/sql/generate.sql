-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `id` INT NOT NULL,
  `Name` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NULL,
  `Salt` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PollType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`PollType` (
  `Id` INT NOT NULL,
  `Name` VARCHAR(45) NULL,
  `Description` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`BlacklistedUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`BlacklistedUser` (
  `User_Id` INT NOT NULL,
  PRIMARY KEY (`User_Id`),
  INDEX `fk_BlacklistedUser_User1_idx` (`User_Id` ASC) VISIBLE,
  CONSTRAINT `fk_BlacklistedUser_User1`
    FOREIGN KEY (`User_Id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`WhitelistedUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`WhitelistedUser` (
  `User_Id` INT NOT NULL,
  PRIMARY KEY (`User_Id`),
  INDEX `fk_WhitelistedUser_User1_idx` (`User_Id` ASC) VISIBLE,
  CONSTRAINT `fk_WhitelistedUser_User1`
    FOREIGN KEY (`User_Id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Poll`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Poll` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(45) NULL,
  `Description` VARCHAR(45) NULL,
  `Creation date` DATE NULL,
  `End date` DATE NULL,
  `IsPrivate` TINYINT NULL,
  `Link` VARCHAR(45) NULL,
  `Creator_Id` INT NOT NULL,
  `PollType_Id` INT NOT NULL,
  PRIMARY KEY (`id`, `Creator_Id`, `PollType_Id`),
  INDEX `fk_Pool_User1_idx` (`Creator_Id` ASC) VISIBLE,
  INDEX `fk_Poll_PollType1_idx` (`PollType_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Pool_User1`
    FOREIGN KEY (`Creator_Id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Poll_PollType1`
    FOREIGN KEY (`PollType_Id`)
    REFERENCES `mydb`.`PollType` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`QuestionType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`QuestionType` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NULL,
  `Description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Question` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(45) NULL,
  `Description` VARCHAR(45) NULL,
  `Poll_id` INT NOT NULL,
  `QuestionType_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Poll_id`, `QuestionType_id`),
  INDEX `fk_Question_Poll1_idx` (`Poll_id` ASC) VISIBLE,
  INDEX `fk_Question_QuestionType1_idx` (`QuestionType_id` ASC) VISIBLE,
  CONSTRAINT `fk_Question_Poll1`
    FOREIGN KEY (`Poll_id`)
    REFERENCES `mydb`.`Poll` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Question_QuestionType1`
    FOREIGN KEY (`QuestionType_id`)
    REFERENCES `mydb`.`QuestionType` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`AnswerOption`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`AnswerOption` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Text` VARCHAR(45) NULL,
  `Index` INT NULL,
  `Question_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Question_id`),
  INDEX `fk_AnswerOption_Question1_idx` (`Question_id` ASC) VISIBLE,
  CONSTRAINT `fk_AnswerOption_Question1`
    FOREIGN KEY (`Question_id`)
    REFERENCES `mydb`.`Question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PollResult`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`PollResult` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Date` DATE NULL,
  `Comment` VARCHAR(45) NULL,
  `Poll_id` INT NOT NULL,
  `User_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Poll_id`, `User_id`),
  INDEX `PollResult_User_idx` (`User_id` ASC) VISIBLE,
  INDEX `PollResult_Poll_idx` (`Poll_id` ASC) VISIBLE,
  CONSTRAINT `PollResult_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `PollResult_Poll`
    FOREIGN KEY (`Poll_id`)
    REFERENCES `mydb`.`Poll` (`PollType_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Answer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Content` VARCHAR(45) NULL,
  `PollResult_id` INT NOT NULL,
  `Question_Id` INT NOT NULL,
  PRIMARY KEY (`id`, `PollResult_id`, `Question_Id`),
  INDEX `fk_Answer_PollResult1_idx` (`PollResult_id` ASC) VISIBLE,
  INDEX `fk_Answer_Question_idx` (`Question_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Answer_PollResult1`
    FOREIGN KEY (`PollResult_id`)
    REFERENCES `mydb`.`PollResult` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Answer_Question`
    FOREIGN KEY (`Question_Id`)
    REFERENCES `mydb`.`Question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PollFeedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`PollFeedback` (
  `id` INT NOT NULL,
  `GeneralComment` VARCHAR(45) NULL,
  `Creator_Id` INT NOT NULL,
  `PollResult_Id` INT NOT NULL,
  PRIMARY KEY (`id`, `Creator_Id`, `PollResult_Id`),
  INDEX `fk_PollFeedback_User_idx` (`Creator_Id` ASC) VISIBLE,
  CONSTRAINT `fk_PollFeedback_User`
    FOREIGN KEY (`Creator_Id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PollFeedback_PollResult`
    FOREIGN KEY ()
    REFERENCES `mydb`.`PollResult` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`QuestionFeedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`QuestionFeedback` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Comment` VARCHAR(45) NULL,
  `PollFeedback_id` INT NOT NULL,
  `Answer_id` INT NOT NULL,
  PRIMARY KEY (`id`, `PollFeedback_id`, `Answer_id`),
  INDEX `fk_QuestionFeedback_PollFeedback1_idx` (`PollFeedback_id` ASC) VISIBLE,
  INDEX `fk_QuestionFeedback_Answer_idx` (`Answer_id` ASC) VISIBLE,
  CONSTRAINT `fk_QuestionFeedback_PollFeedback1`
    FOREIGN KEY (`PollFeedback_id`)
    REFERENCES `mydb`.`PollFeedback` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_QuestionFeedback_Answer`
    FOREIGN KEY (`Answer_id`)
    REFERENCES `mydb`.`Answer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `mydb`.`User`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`User` (`id`, `Name`, `Email`, `Password`, `Salt`) VALUES (1, 'vasyan', 'vasyan@gmail.com', '43b1cc1db7be63d899dd4280f578691a', '3d899d');
INSERT INTO `mydb`.`User` (`id`, `Name`, `Email`, `Password`, `Salt`) VALUES (2, 'petya', 'petya@rambler.ru', '743a0882b34315fca930959a9cabff05', '4315fca9309');
INSERT INTO `mydb`.`User` (`id`, `Name`, `Email`, `Password`, `Salt`) VALUES (3, 'kolyan', 'kolyan@ukr.net', '8bdddd76872308ea7f8430af29bd1a9a', 'ea7f8430');
INSERT INTO `mydb`.`User` (`id`, `Name`, `Email`, `Password`, `Salt`) VALUES (4, 'bad boy', 'ruiner@gmail.com', 'cd36c31e8108a2069667e2766293c9c9', '2766293c9');
INSERT INTO `mydb`.`User` (`id`, `Name`, `Email`, `Password`, `Salt`) VALUES (5, 'angel', 'blessing@gmail.com', '3b719aef85e56b96de43abfa3740afe2', 'bfa3740af');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`PollType`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`PollType` (`Id`, `Name`, `Description`) VALUES (1, 'Plain', 'Just a poll');
INSERT INTO `mydb`.`PollType` (`Id`, `Name`, `Description`) VALUES (2, 'Quiz', 'Check your ingelligence');
INSERT INTO `mydb`.`PollType` (`Id`, `Name`, `Description`) VALUES (3, 'Test', 'Poll with right and wrong answers');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`BlacklistedUser`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`BlacklistedUser` (`User_Id`) VALUES (4, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`WhitelistedUser`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`WhitelistedUser` (`User_Id`) VALUES (5, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Poll`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Poll` (`id`, `Title`, `Description`, `Creation date`, `End date`, `IsPrivate`, `Link`, `Creator_Id`, `PollType_Id`) VALUES (1, 'Which OT teacher are you?', 'just for fun', '12-12-2020', '01-01-2021', 0, 'funny', 1, 1, 1);
INSERT INTO `mydb`.`Poll` (`id`, `Title`, `Description`, `Creation date`, `End date`, `IsPrivate`, `Link`, `Creator_Id`, `PollType_Id`) VALUES (2, 'Final exam', 'I WILL KILL YOU FOR THE WRONG ANSWERS!', '12-12-2021', '12-12-2021', 1, 'test', 2, 2, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`QuestionType`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`QuestionType` (`id`, `Name`, `Description`) VALUES (1, 'Input', 'Text answer');
INSERT INTO `mydb`.`QuestionType` (`id`, `Name`, `Description`) VALUES (2, 'Single selection', 'Multiple options, only one is correct');
INSERT INTO `mydb`.`QuestionType` (`id`, `Name`, `Description`) VALUES (3, 'Multiple selection', 'Multiple options with multiple answers');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Question`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Question` (`id`, `Title`, `Description`, `Poll_id`, `QuestionType_id`) VALUES (1, 'What is a compiler?', 'Describe in one sentence', 2, 1);
INSERT INTO `mydb`.`Question` (`id`, `Title`, `Description`, `Poll_id`, `QuestionType_id`) VALUES (2, 'Andrew Boldak is the best teacher', 'You will be killed for the wrong answer', 2, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`AnswerOption`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`AnswerOption` (`id`, `Text`, `Index`, `Question_id`) VALUES (1, 'True', 1, 2);
INSERT INTO `mydb`.`AnswerOption` (`id`, `Text`, `Index`, `Question_id`) VALUES (2, 'False', 2, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`PollResult`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`PollResult` (`id`, `Date`, `Comment`, `Poll_id`, `User_id`) VALUES (1, '10.12.2021', 'I\'ve done with the bad uni', 2, 1);
INSERT INTO `mydb`.`PollResult` (`id`, `Date`, `Comment`, `Poll_id`, `User_id`) VALUES (2, '20.12.2021', 'I hope it will be all right :}', 2, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Answer`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Answer` (`id`, `Content`, `PollResult_id`, `Question_Id`) VALUES (1, 'It is a devil\'s toy', 1, 1);
INSERT INTO `mydb`.`Answer` (`id`, `Content`, `PollResult_id`, `Question_Id`) VALUES (2, 'True', 1, 2);
INSERT INTO `mydb`.`Answer` (`id`, `Content`, `PollResult_id`, `Question_Id`) VALUES (3, 'It is a thing to compile', 2, 1);
INSERT INTO `mydb`.`Answer` (`id`, `Content`, `PollResult_id`, `Question_Id`) VALUES (4, 'True', 2, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`PollFeedback`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`PollFeedback` (`id`, `GeneralComment`, `Creator_Id`, `PollResult_Id`) VALUES (1, 'Nice', 2, 1);
INSERT INTO `mydb`.`PollFeedback` (`id`, `GeneralComment`, `Creator_Id`, `PollResult_Id`) VALUES (2, 'Not very nice', 2, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`QuestionFeedback`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`QuestionFeedback` (`id`, `Comment`, `PollFeedback_id`, `Answer_id`) VALUES (1, 'That is very true', 1, 1);

COMMIT;
