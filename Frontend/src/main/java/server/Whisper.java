package server;

import client.API;
import java.io.*;
import java.net.*;
import org.json.*;

public class Whisper implements API {

  private String API_ENDPOINT; // = "https://api.openai.com/v1/audio/transcriptions";
  private String TOKEN;
  private String MODEL; //= "whisper-1";
  private String FILE_PATH;
  private String text;

  // constructor called by application
  public Whisper(String path) {
    this.FILE_PATH = path;
    API_ENDPOINT = "https://api.openai.com/v1/audio/transcriptions";
    MODEL = "whisper-1";
  }

  public void setInput(String input) {
    this.FILE_PATH = input;
  }

  public String getOutput() {
    try {
      return translateVoiceToText();
    } catch (IOException e) {
      e.printStackTrace();
    } catch (URISyntaxException e) {
      e.printStackTrace();
    }
    return null;
  }

  //     // Helper method to write a parameter to the output stream in multipart form data format
  //     private static void writeParameterToOutputStream(
  //             OutputStream outputStream,
  //             String parameterName,
  //             String parameterValue,
  //             String boundary
  //     ) throws IOException {
  //         outputStream.write(("--" + boundary + "\r\n").getBytes());
  //         outputStream.write(
  //                 (
  //                         "Content-Disposition: form-data; name=\"" + parameterName + "\"\r\n\r\n"
  //                 ).getBytes()
  //         );
  //         outputStream.write((parameterValue + "\r\n").getBytes());
  //     }

  //     // Helper method to write a file to the output stream in multipart form data format
  //     private static void writeFileToOutputStream(
  //             OutputStream outputStream,
  //             File file,
  //             String boundary
  //     ) throws IOException {
  //         outputStream.write(("--" + boundary + "\r\n").getBytes());
  //         outputStream.write(
  //                 (
  //                         "Content-Disposition: form-data; name=\"file\"; filename=\"" +
  //                                 file.getName() +
  //                                 "\"\r\n"
  //                 ).getBytes()
  //         );
  //         outputStream.write(("Content-Type: audio/mpeg\r\n\r\n").getBytes());

  //         FileInputStream fileInputStream = new FileInputStream(file);
  //         byte[] buffer = new byte[1024];
  //         int bytesRead;
  //         while ((bytesRead = fileInputStream.read(buffer)) != -1) {
  //             outputStream.write(buffer, 0, bytesRead);
  //         }
  //         fileInputStream.close();
  //     }

  // Helper method to handle a successful response
  private String handleSuccessResponse(HttpURLConnection connection)
    throws IOException, JSONException {
    BufferedReader in = new BufferedReader(
      new InputStreamReader(connection.getInputStream())
    );
    String inputLine;
    StringBuilder response = new StringBuilder();
    while ((inputLine = in.readLine()) != null) {
      response.append(inputLine);
    }
    in.close();
    JSONObject responseJson = new JSONObject(response.toString());

    String generatedText = responseJson.getString("text").toLowerCase();
    generatedText =
      generatedText.charAt(generatedText.length() - 1) == '.'
        ? generatedText.substring(0, generatedText.indexOf('.'))
        : generatedText;
    System.out.println("Whisper output: |" + generatedText + "|");
    return generatedText;
  }

  public String translateVoiceToText() throws IOException, URISyntaxException {
    // Create file object from file path
    File file = new File(FILE_PATH);

    // Set up HTTP connection

    URL url = new URI(API_ENDPOINT).toURL();
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("POST");
    connection.setDoOutput(true);

    // Set up request headers
    String boundary = "Boundary-" + System.currentTimeMillis();
    connection.setRequestProperty(
      "Content-Type",
      "multipart/form-data; boundary=" + boundary
    );
    connection.setRequestProperty("Authorization", "Bearer " + TOKEN);

    // Set up output stream to write request body
    OutputStream outputStream = connection.getOutputStream();

    // Write model parameter to request body
    // writeParameterToOutputStream(outputStream, "model", MODEL, boundary);

    // Write file parameter to request body
    // writeFileToOutputStream(outputStream, file, boundary);

    // Write closing boundary to request body
    outputStream.write(("\r\n--" + boundary + "--\r\n").getBytes());

    // Flush and close output stream
    outputStream.flush();
    outputStream.close();

    // Get response code
    int responseCode = connection.getResponseCode();

    // Check response code and handle response accordingly
    String resultText;
    if (responseCode == HttpURLConnection.HTTP_OK) {
      resultText = handleSuccessResponse(connection);
    } else {
      resultText = "Error result! Please try again :>"; // handleErrorResponse(connection);
    }
    text = resultText;

    // Disconnect connection
    connection.disconnect();
    return resultText;
  }
}
