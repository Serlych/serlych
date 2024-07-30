import TechShowcase from "~/components/TechShowcase";
import LogoWithDescription from "~/components/LogoWithDescription";
import Section from "~/components/Section";

import js from "~/assets/js.png";
import ts from "~/assets/ts.png";
import html from "~/assets/html.png";
import css from "~/assets/css.svg";
import git from "~/assets/git.png";
import react from "~/assets/react.png";
import postgres from "~/assets/postgres.png";
import markdown from "~/assets/markdown.png";

import angular from "~/assets/angular.png";
import express from "~/assets/express.png";
import node from "~/assets/node.png";
import graphql from "~/assets/graphql.png";
import apollo from "~/assets/apollo.webp";
import tensorflow from "~/assets/tf.png";
import mongo from "~/assets/mongo.png";
import aws from "~/assets/aws.png";
import dart from "~/assets/dart.png";
import docker from "~/assets/docker.png";
import python from "~/assets/python.png";
import bash from "~/assets/bash.png";
import cassandra from "~/assets/cassandra.png";
import neo4j from "~/assets/neo4j.png";
import scikit from "~/assets/scikit.png";
import flutter from "~/assets/flutter.png";
import trpc from "~/assets/trpc.png";
import next from "~/assets/next.png";
import redux from "~/assets/redux.png";
import tailwind from "~/assets/tailwind.png";
import supabase from "~/assets/supabase.png";

export default function TechnicalExpertise() {
  return (
    <Section className="flex-col">
      <TechShowcase description="I am most experienced with...">
        <LogoWithDescription logoSrc={js} description="JavaScript" />
        <LogoWithDescription logoSrc={ts} description="TypeScript" />
        <LogoWithDescription logoSrc={html} description="HTML" />
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <LogoWithDescription logoSrc={css} description="CSS" />
        <LogoWithDescription logoSrc={git} description="Git" />
        <LogoWithDescription logoSrc={react} description="React" />
        <LogoWithDescription logoSrc={postgres} description="PostgreSQL" />
        <LogoWithDescription logoSrc={markdown} description="Docs" />
      </TechShowcase>
      <TechShowcase description="I have some experience with...">
        <LogoWithDescription logoSrc={angular} description="Angular" />
        <LogoWithDescription logoSrc={express} description="Express" />
        <LogoWithDescription logoSrc={node} description="NodeJS" />
        <LogoWithDescription logoSrc={graphql} description="GraphQL" />
        <LogoWithDescription logoSrc={apollo} description="Apollo" />
        <LogoWithDescription logoSrc={tensorflow} description="TensorFlow" />
        <LogoWithDescription logoSrc={mongo} description="MongoDB" />
        <LogoWithDescription logoSrc={aws} description="AWS" />
        <LogoWithDescription logoSrc={dart} description="Dart" />
        <LogoWithDescription logoSrc={docker} description="Docker" />
        <LogoWithDescription logoSrc={python} description="Python" />
        <LogoWithDescription logoSrc={bash} description="Bash" />
        <LogoWithDescription logoSrc={cassandra} description="CassandraDB" />
        <LogoWithDescription logoSrc={neo4j} description="Neo4j" />
        <LogoWithDescription logoSrc={scikit} description="Scikit" />
        <LogoWithDescription logoSrc={flutter} description="Flutter" />
        <LogoWithDescription logoSrc={trpc} description="TRPC" />
        <LogoWithDescription logoSrc={next} description="NextJS" />
        <LogoWithDescription logoSrc={redux} description="Redux" />
        <LogoWithDescription logoSrc={tailwind} description="Tailwind" />
        <LogoWithDescription logoSrc={react} description="Native" />
        <LogoWithDescription logoSrc={supabase} description="Supabase" />
      </TechShowcase>
    </Section>
  );
}
