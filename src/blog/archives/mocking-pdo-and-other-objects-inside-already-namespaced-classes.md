---
title: "Mocking PDO(and other) Objects Inside Already Namespaced Classes"
date: "2012-04-25"
coverImage: "../images/php-pdo-monkeypatched-part2.jpg"
slug: "mocking-pdo-and-other-objects-inside-already-namespaced-classes"
---

I'm back again addressing the issue of Mocking PDO and similar objects for unit-testing purposes. [My previous post](http://chrisgriffing.com/coding/php/2012/04/12/how-to-mock-pdo-and-other-objects/ "How to Mock PDO (and other) objects") showed how to do so when testing a class that is not namespaced. It basically injected the class being tested into a namespace that contained a mock PDO class. This didn't work with classes that are already in a namespace though.

The trick is to inject the mock PDO object into the namespace of the class being tested. To better explain, here is some code.

---

### Class Being Tested:

This is mostly the same class that was being tested in the previous post. The only change is the addition of the namespace declaration on the first line. `namespace DBManagerNamespace;

class DBManager {

private $db_dsn; private $db_username; private $db_password; private $connection = null;

function \_\_construct($db_dsn, $db_username, $db_password) { $this->db_dsn = $db_dsn; $this->db_username = $db_username; $this->db_password = \$db_password; }

// The open function sets up the database for operation. public function open() { try { $this->connection = new PDO($this->db_dsn, $this->db_username, $this->db_password); } catch(PDOException $e) { echo "An database connection error occurred:". " {$e->getMessage()}"; exit(); } } public function execute($sql) { try { $result = $this->connection->query($sql); if ( !$result ) { throw new PDOException(); } return $result; } catch (PDOException $e ) { $this->test("Execute failed: ".$sql); return $result; } } }`

### The Technique

Like the last post, I am using eval() to do the injection. In most cases, you will know the namespace so you can simply hard-code it into the test. However, in my code I decided to dynamically get the namespace. `namespace MockPDOWithExpectedResults;

$classesOld = get_declared_classes(); if(!class_exists('DBManager')) include('../php/DBManager.php'); $classesNew = get_declared_classes(); $classesDiff = array_diff($classesNew, $classesOld); $classJustAdded = current($classesDiff); $namespace = substr($classJustAdded, 0, strrpos($classJustAdded, '\\')); \$pdoMockDefinition = ' class PDO extends \PDO {

public function \_\_construct($a, $b, $c) { $arbitrary = "nothing important here"; } public function query(\$sql) { return "some text"; } }';

eval("namespace $namespace; $pdoMockDefinition");

use DBManagerNamespace\DBManager as DBManager; class DBManagerTestsWithExpectedResults extends \UnitTestCase {

function testOpenAndExecute() { $DBManager = new DBManager("","",""); $DBManager->open(); $DBMReflection = new \ReflectionObject($DBManager); $propertyConnection = $DBMReflection->getProperty("connection"); $propertyConnection->setAccessible(true); $FQClassNameArray = parse_classname(get_class($propertyConnection->getValue($DBManager))); $connectionClass = $FQClassNameArray["classname"]; $this->assertEqual($connectionClass, 'PDO', "after the open method, the connection should be a PDO object."); $result = $DBManager->execute("some sql"); $this->assertEqual($result, "some text", "This test needs to be changed."); } }`

### Conclusion:

Notice that I had still had to hard-code the namespace in the "use ... as ..." line. I could have hard-coded it into the "new DBManager..." line instead but that wouldn't really have changed anything. I wasn't able to think of a way to accomplish that part dynamically.
