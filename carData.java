/* Jason Rudinsky
* COP 4710
* April 9, 2023

* This is a program that will be used to create random data that we will use in our cars table.

* 4/9/2023 - Original Version
*/

package Project_4;                                                                                                // Designates the package the file belongs to

import java.io.*;                                                                                                 // Creates a file IO
import java.util.*;                                                                                               // Imports Java Util libraries

public class carData{
   public static void main(String[] args){
      
      String[] carModels = {"Pontiac", "Ford", "Nissan", "Honda", "Mazda"};                                       // Creates a String array
      String[] carMake = {"PSunfire", "PMontana", "PAztek", "PVibe", "PG6", "PSolstice", "PTorrent",
                        "FFusion", "FExcursion", "FEscape", "FFreestyle", "FFlex", "FFocus",
                        "NAltima", "NMaxima", "NSentra", "NSkyline", "NAriya", "NMicra",
                        "NNote", "HCivic", "HAccord", "HCR-V", "HNSX", "HInsight", "HStream",
                        "HPilot", "MMazda2", "MRoadster", "MScrum Wagon", "MTitan", "MRX-8",
                        "MRX-7", "MCX-7"};                                                                        // Creates the carMake String array
      
      
      File myFile = new File("CarInfo.txt");                                                                      // Creates a new file document
      
      boolean writeScheme = true;                                                                                 // Defines writeScheme
      
      int carKey = 1000;                                                                                          // Defines carKey
      int LCV = 0;                                                                                                // Defines LCV
      int LCV2 = 0;                                                                                               // Defines LCV2
      int LCV3 = 0;                                                                                               // Defines LCV3
      
     
      for(LCV = 1999; LCV <= 2010; LCV++){                                                                        // For Loop
         for(LCV2 = 0; LCV2 < carModels.length; LCV2++){                                                          // Nested For Loop
            for(LCV3 = 0; LCV3 < carMake.length; LCV3++){                                                         // Double Nested For Loop
               
               if(carModels[LCV2].substring(0, 1).equals(carMake[LCV3].substring(0, 1))){                         // If statement
                  
                  try{                                                                                            // Create a File Output Stream
                     PrintWriter output = new PrintWriter(new FileOutputStream(myFile, writeScheme));             // Creates a print writer for the text file
                     
                     output.printf("%d,%d,%s,%s\n", carKey, LCV, carModels[LCV2], carMake[LCV3].substring(1));    // Prints out to the file
                     
                     carKey++;                                                                                    // Adds to the value of carKey
                     
                     output.close();                                                                              // Closes the file
                  }
                  catch(IOException example){                                                                     // Catch statement 
                     System.out.printf("File IO error. %s\n", example);                                           // Prints out to the user
                  }
                  
               }
            }
         }
      }
   }
}