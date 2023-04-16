import Head from "next/head";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import ServiceManager from "../../Services/ServiceManager";
import Loader from "../../Components/Loader";
import Image from "next/image";
const { getActiveUsers, getAllEnquiries } = ServiceManager();

const NavigatorIcon =
  "data:image/png;base64,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";

export default function Home() {
  const [activeUsers, setActiveUsers] = useState({});
  const [loading, setLoader] = useState(false);
  const [queryLoader, setQueryLoader] = useState(false);
  const [selectedTile, setSelectedTile] = useState("");
  const [isDomainSelected, setDomain] = useState(false);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getActiveUsers().then((users) => {
        if (users) {
          setActiveUsers(users);
        }
      });
      getAllEnquiries()
        .then((list) => {
          if (list) {
            setEnquiries(list || []);
            let avenuePacksCount = 0;
            let avenueCorpCount = 0;
            list.forEach((el) => {
              if (el.domain === "avenue-corporation") {
                avenueCorpCount++;
              }
              if (el.domain === "avenue-packs") {
                avenuePacksCount++;
              }
            });
            if (avenueCorpCount >= avenuePacksCount) {
              selectAvenueCorporation();
            } else {
              selectAvenuePacks();
            }
            setLoader(true);
          }
        })
        .catch((err) => console.log(err));
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      getActiveUsers().then((users) => {
        if (users) {
          setActiveUsers(users);
        }
      });
      getAllEnquiries()
        .then((list) => {
          if (list) {
            setEnquiries(list || []);
            let avenuePacksCount = 0;
            let avenueCorpCount = 0;
            list.forEach((el) => {
              if (el.domain === "avenue-corporation") {
                avenueCorpCount++;
              }
              if (el.domain === "avenue-packs") {
                avenuePacksCount++;
              }
            });
            if (avenueCorpCount >= avenuePacksCount) {
              selectAvenueCorporation();
            } else {
              selectAvenuePacks();
            }
            setLoader(true);
          }
        })
        .catch((err) => console.log(err));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (document) {
      if (document.getElementById("EnquiryTiles"))
        Array.prototype.slice
          .call(document.getElementById("EnquiryTiles").children)
          .map((el) => {
            if (el.id === selectedTile) el.classList.add(styles.activeTile);
            else el.classList.remove(styles.activeTile);
          });
    }
  }, [selectedTile]);

  const formatTimestamp = (timestamp) =>
    new Date(timestamp).toLocaleDateString();

  const selectAvenueCorporation = () => {
    setQueryLoader(true);

    const timer = setTimeout(() => {
      setDomain(true);
      setQueryLoader(false);
      clearTimeout(timer);
    }, 2000);
  };
  const selectAvenuePacks = () => {
    setQueryLoader(true);

    const timer = setTimeout(() => {
      setDomain(false);
      setQueryLoader(false);
      clearTimeout(timer);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Avenue Corporation</title>
        <meta name="description" content="Generated by Avenue Corporation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <main className={styles.main}>
          <div className={styles.description}>
            <h4>Active Users</h4>
            <div className="active-users">
              <div className="container">
                <span className="zero">{activeUsers.avenuepacks}</span>
                <p>Avenue Packs</p>
              </div>
              <div className="container">
                <span className="zero">{activeUsers.avenuecorporation}</span>
                <p>Avenue Corporation</p>
              </div>
            </div>
          </div>
          <div className={styles.queryContainer}>
            <div className={`${styles.row} title`}>enquiries</div>
            {!queryLoader && (
              <div className={`${styles.row} filter`}>
                <div
                  className={`avenue-corporation-filter ${
                    isDomainSelected ? "active-filter" : ""
                  }`}
                  onClick={selectAvenueCorporation}
                >
                  Avenue Corporation
                </div>
                <div
                  className={`filter-separator ${
                    isDomainSelected ? "" : "reverse"
                  }`}
                ></div>
                <div
                  className={`avenue-packs-filter ${
                    isDomainSelected ? "" : "active-filter"
                  }`}
                  onClick={selectAvenuePacks}
                >
                  Avenue Packs
                </div>
              </div>
            )}
            {queryLoader ? (
              <Loader className={"query-loader"} />
            ) : (
              <div className={styles.row} id="EnquiryTiles">
                {enquiries.map(
                  (el) =>
                    (isDomainSelected
                      ? el.domain === "avenue-corporation"
                      : el.domain === "avenue-packs") && (
                      <div
                        className={styles.tile}
                        key={btoa(el.email)}
                        onClick={(e) => setSelectedTile(btoa(el.email))}
                      >
                        <span>{el.name}</span>
                        <hr />
                        <span className={styles.shortDescription}>
                          <label>Date : {formatTimestamp(el.timestamp)}</label>
                          {selectedTile !== btoa(el.email) ? (
                            <Image
                              src={"/navigator-icon.png"}
                              width={25}
                              height={25}
                              alt="navigator icon"
                            />
                          ) : (
                            <label>
                              Mobile : <label>{el.mobile}</label>
                            </label>
                          )}
                        </span>
                        <motion.div
                          layout
                          className={styles.tileDescription}
                          data-isopen={selectedTile === btoa(el.email)}
                        >
                          {selectedTile === btoa(el.email) && (
                            <>
                              <label>
                                <label className={styles.fieldLabel}>
                                  Email
                                </label>
                                &nbsp;:
                                <label>{el.email}</label>
                              </label>
                              {el.companyname && (
                                <label>
                                  <label className={styles.fieldLabel}>
                                    Company
                                  </label>
                                  &nbsp;:{el.companyname}
                                </label>
                              )}
                              <br />
                              <p>{el.msg}</p>
                              <br />
                              {/* Show location here from el.location */}
                            </>
                          )}
                        </motion.div>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
}
