---
title: "How to Mock PDO (and other) objects"
date: "2012-04-12"
coverImage: "../images/php-pdo-monkeypatched.jpg"
slug: "how-to-mock-pdo-and-other-objects"
---

**Edited - Apr 25 2012: There is updated code in a [later post](http://chrisgriffing.com/coding/php/2012/04/25/mocking-pdoand-other-objects-inside-already-namespaced-classes/ "Mocking PDO(and other) Objects Inside Already Namespaced Classes") that works with already namespaced classes.**

I have been trying to wrap my head around unit-testing classes that interact with databases.  Theoretically, the unit tests should be able to run without a live server connection.

The class I was unit-testing had a method that creates a PDO connection object and stores it in a private instance property.  The problem is that you cannot get a proper PDO object without a DB connection.  The  property can be viewed and set with Reflection.  However, setting the property using reflection feels like "cheating on the test".

The idea was that when the PDO object is created, somehow I needed to hook that class call to a mock PDO object instead.  From what I have read, this is called "Monkey Patching".  Also according to my searching, this cannot be done in PHP.

Thanks to Namespaces in PHP 5.3+ it is actually possible.  Since I haven't seen this technique posted elsewhere, I will demonstrate it here.

---

### The Class Being Tested

Let's take a look at the class.

```php
class DBManager {

  private $db_dsn;
  private $db_username;
  private $db_password;
  private $connection = null;

  function __construct($db_dsn, $db_username, $db_password) {
    $this->db_dsn = $db_dsn; $this->db_username = $db_username; $this->db_password = $db_password;
  }

  // The open function sets up the database for operation.
  public function open() {
    try {
      $this->connection = new PDO($this->db_dsn, $this->db_username, $this->db_password);
    } catch(PDOException $e) {
      echo "An database connection error occurred:". " {$e->getMessage()}";
      exit();
    }
  }
  public function execute($sql) {
    try {
      $result = $this->connection->query($sql);
      if ( !$result ) {
        throw new PDOException();
      }
      return $result;
    } catch (PDOException $e ) {
      $this->test("Execute failed: ".$sql);
      return $result;
    }
  }
}

```

### The Test:

Here is the Test Case. It is using Simpletest, however, there is no reason why this technique can't be used in PHPUnit (or other php testing framework).

```php
namespace MockPDOWithExpectedResults;

if(!class_exists('UnitTestCase')) {
  include('simpletest/autorun.php');
}

class PDO extends \PDO {

  public function __construct($a, $b, $c) {
    $arbitrary = "nothing important here";
  }

  public function query($sql) {
    return 'some text';
  }
}

// This eval declares the class under this namespace instead of an include which declares it under the global namespace.
eval("namespace MockPDOWithExpectedResults;" . file_get_contents("../php/DBManager.php", false, NULL, 5));

class DBManagerTestsWithExpectedResults extends \UnitTestCase {
  function testOpenAndExecute() {
    $DBManager = new DBManager("","","");
    $DBManager->open();
    $DBMReflection = new \ReflectionObject($DBManager);
    $propertyConnection = $DBMReflection->getProperty("connection");
    $propertyConnection->setAccessible(true);
    $FQClassNameArray = parse_classname(
      get_class(
      $propertyConnection->getValue($DBManager)
      )
  );

  $connectionClass = $FQClassNameArray["classname"];

  $this->assertEqual(
    $connectionClass, 'PDO', "after the open method, the connection should be a PDO object."
  );

  $result = $DBManager->execute("some sql");

  $this->assertEqual($result, "some text", "This test needs to be changed.");
  }
}

```

### Conclusion:

Basically, the namespace must be declared on the first line. Then, the mock PDO object is created. Using eval and string concatenation, we can declare the class we are testing within the same namespace as our mock PDO object. Monkey Patching Accomplished!!!

### Caveats/Notes:

- **Namespaces must be declared on the first line of a script.** However, it is possible to declare multiple namespaces afterwards in the same script. So, in the event of unit-testing one class per file, it might be best to declare a namespace without the mocked class for methods that don't require the mock. Then, you would have a namespace for each version of the mock with different outputs. Example: One namespace for a mock that returns what it is supposed to, and then a separate namespace that defines a mock with expected error results.
- **Requires Non-Namespaced code.** I have done a little bit of testing with a DBManager that is already declared within a DBManager namespace. So far I haven't found a workaround other than string manipulation to remove the DBManager namespace. The string manipulated code would break if the class contains other namespace dependent code. Edit: this issue is addressed in [another post.](http://chrisgriffing.com/coding/php/2012/04/25/mocking-pdoand-other-objects-inside-already-namespaced-classes/ "Mocking PDO(and other) Objects Inside Already Namespaced Classes")
