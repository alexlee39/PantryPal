package com.PantryPal.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    @Value("${security.jwt.secret-key}")
    private String jwtSecretKey;
    @Value("${security.jwt.expiration-time}")
    private long jwtExpirationTime;

    /** Extract Email(which is the 'Username') from a given JWT-Token
     *
     * @param token : JWT Token
     * @return User's Email
     */
    public String extractEmail(String token){
        Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }

    // Reference: https://github.com/jwtk/jjwt?tab=readme-ov-file#jwt-claims
    public String generateToken(UserDetails userDetails){
        Map<String,Object> extraClaims = new HashMap<>();
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(Date.from(Instant.now()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationTime))
                .signWith(getSignInKey())
                .compact();
    }

    /** Getting Claims i.e. Getting the Payload of Jwt Token.
     *  Reference:  <a href="https://github.com/jwtk/jjwt?tab=readme-ov-file#reading-a-jwe">...</a>
     * @param token:
     * @return Payload in terms of Claims Object
     *
     * Add ways to throw different exceptions => Expired JWT Tokens, Invalid JWT Tokens?
     */
    public Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }


    private SecretKey getSignInKey(){
        byte[] decodedKey = Base64.getDecoder().decode(jwtSecretKey);
        return Keys.hmacShaKeyFor(decodedKey);
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String email = extractEmail(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Gets the Expiration Date from token Payload(Claims), checks if it is before current Time/Date.
    private boolean isTokenExpired(String token) {
        Claims claims = extractAllClaims(token);
        return claims.getExpiration().before(new Date());
    }
}
