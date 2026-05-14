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
import tanstack from "~/assets/tanstack.svg";
import next from "~/assets/next.png";
import redux from "~/assets/redux.png";
import tailwind from "~/assets/tailwind.png";
import supabase from "~/assets/supabase.png";
import github from "~/assets/github.svg";
import mongoose from "~/assets/mongoose.svg";
import zod from "~/assets/zod.svg";
import kafka from "~/assets/kafka.svg";
import rabbitmq from "~/assets/rabbitmq.svg";
import sqs from "~/assets/sqs.svg";
import kinesis from "~/assets/kinesis.svg";
import redpanda from "~/assets/redpanda.svg";
import datadog from "~/assets/datadog.svg";
import launchdarkly from "~/assets/launchdarkly.svg";
import meta from "~/assets/meta.svg";
import whatsapp from "~/assets/whatsapp.svg";
import bird from "~/assets/bird.svg";
import { resumeData } from "~/data/resume";

const techLogoMap = {
  js,
  ts,
  html,
  css,
  git,
  react,
  postgres,
  markdown,
  angular,
  express,
  node,
  graphql,
  apollo,
  tensorflow,
  mongo,
  aws,
  dart,
  docker,
  python,
  bash,
  cassandra,
  neo4j,
  scikit,
  flutter,
  trpc,
  tanstack,
  next,
  redux,
  tailwind,
  "react-native": react,
  supabase,
  github,
  mongoose,
  zod,
  kafka,
  rabbitmq,
  sqs,
  kinesis,
  redpanda,
  datadog,
  launchdarkly,
  "meta-api": meta,
  whatsapp,
  bird,
} as const;

export default function TechnicalExpertise() {
  return (
    <Section className="flex-col">
      {resumeData.technicalExpertise.sections.map((section, sectionIndex) => (
        <TechShowcase key={sectionIndex} description={section.description}>
          {section.items.map((item) => {
            const logoSrc = item.id in techLogoMap ? techLogoMap[item.id as keyof typeof techLogoMap] : undefined;

            return <LogoWithDescription key={item.id} logoSrc={logoSrc} description={item.label} />;
          })}
        </TechShowcase>
      ))}
    </Section>
  );
}
