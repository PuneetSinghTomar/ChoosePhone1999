"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#F5F5F8", mt: 4, py: 4, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          {/* Logo and Social Icons */}
          <Grid item xs={12} sm={6} md={3}>
            <Image
              src="/2-removebg-preview.png"
              alt="Logo"
              width={100}
              height={50}
              priority
              style={{ width: "auto", height: "auto" }}
            />
            <Box sx={{ display: "flex", mt: 2, gap: 3 }}>
              {[FaFacebook, FaInstagram].map((Icon, index) => (
                <Icon key={index} style={{ fontSize: "1.5rem", cursor: "pointer", color: "#333" }} />
              ))}
            </Box>
          </Grid>

          {/* Navigation Links */}
          {[
            { title: "Navigation", links: [
                { name: "About Us", href: "/Aboutus" },
                { name: "Trends", href: "/Trends" }
              ] },
            { title: "Account", links: [
                { name: "Login", href: "/login" },
                { name: "Register", href: "/register" }
              ] },
            { title: "Company", links: [
                { name: "Privacy Policy", href: "/Privacypolicy" },
                { name: "Terms of Service", href: "/Termsofservice" },
                { name: "Affiliate Disclosure", href: "/Affiliatediscloser" }
              ] }
          ].map((section, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {section.title}
              </Typography>
              {section.links.map((link, idx) => (
                <Link key={idx} href={link.href} passHref>
                  <Typography component="a" underline="hover" color="inherit" display="block" sx={{ cursor: "pointer" }}>
                    {link.name}
                  </Typography>
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>

        {/* Copyright Text */}
        <Box textAlign="center" mt={5} pt={2} borderTop="1px solid #ddd">
          © {new Date().getFullYear()} ChoosePhone. All Rights Reserved.
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
