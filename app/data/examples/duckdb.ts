const duckdbExamples = {
  "example 1": `{
  "result_set_size": 0,
  "cumulative_rows_scanned": 0,
  "cumulative_cardinality": 0,
  "extra_info": {},
  "cpu_time": 0.0,
  "blocked_thread_time": 0.0,
  "rows_returned": 0,
  "query_name": "",
  "latency": 0.0,
  "children": [
    {
      "result_set_size": 0,
      "operator_timing": 0.0,
      "operator_rows_scanned": 0,
      "cumulative_rows_scanned": 0,
      "operator_cardinality": 0,
      "operator_type": "EXPLAIN_ANALYZE",
      "cumulative_cardinality": 0,
      "cpu_time": 0.0,
      "operator_name": "EXPLAIN_ANALYZE",
      "extra_info": {},
      "children": [
        {
          "operator_name": "PROJECTION",
          "cpu_time": 0.0,
          "extra_info": {
            "Projections": [
              "__internal_decompress_string(#0)",
              "__internal_decompress_string(#1)",
              "__internal_decompress_integral_bigint(#2, 1992)",
              "#3"
            ],
            "Estimated Cardinality": "1232"
          },
          "cumulative_cardinality": 0,
          "operator_type": "PROJECTION",
          "operator_cardinality": 4,
          "cumulative_rows_scanned": 0,
          "operator_rows_scanned": 0,
          "operator_timing": 0.0,
          "result_set_size": 224,
          "children": [
            {
              "result_set_size": 196,
              "operator_timing": 0.0,
              "operator_rows_scanned": 0,
              "cumulative_rows_scanned": 0,
              "operator_cardinality": 4,
              "operator_type": "ORDER_BY",
              "cumulative_cardinality": 0,
              "cpu_time": 0.0,
              "operator_name": "ORDER_BY",
              "extra_info": {
                "Order By": [
                  "shipping.supp_nation ASC",
                  "shipping.cust_nation ASC",
                  "shipping.l_year ASC"
                ]
              },
              "children": [
                {
                  "operator_name": "PROJECTION",
                  "cpu_time": 0.0,
                  "extra_info": {
                    "Projections": [
                      "__internal_compress_string_hugeint(#0)",
                      "__internal_compress_string_hugeint(#1)",
                      "__internal_compress_integral_utinyint(#2, 1992)",
                      "#3"
                    ],
                    "Estimated Cardinality": "1232"
                  },
                  "cumulative_cardinality": 0,
                  "operator_type": "PROJECTION",
                  "operator_cardinality": 4,
                  "cumulative_rows_scanned": 0,
                  "operator_rows_scanned": 0,
                  "operator_timing": 0.0,
                  "result_set_size": 196,
                  "children": [
                    {
                      "result_set_size": 224,
                      "operator_timing": 0.0,
                      "operator_rows_scanned": 0,
                      "cumulative_rows_scanned": 0,
                      "operator_cardinality": 4,
                      "operator_type": "PROJECTION",
                      "cumulative_cardinality": 0,
                      "cpu_time": 0.0,
                      "operator_name": "PROJECTION",
                      "extra_info": {
                        "Projections": [
                          "__internal_decompress_string(#0)",
                          "__internal_decompress_string(#1)",
                          "__internal_decompress_integral_bigint(#2, 1992)",
                          "#3"
                        ],
                        "Estimated Cardinality": "1232"
                      },
                      "children": [
                        {
                          "operator_name": "HASH_GROUP_BY",
                          "cpu_time": 0.0,
                          "extra_info": {
                            "Groups": [
                              "#0",
                              "#1",
                              "#2"
                            ],
                            "Aggregates": "sum(#3)",
                            "Estimated Cardinality": "1232"
                          },
                          "cumulative_cardinality": 0,
                          "operator_type": "HASH_GROUP_BY",
                          "operator_cardinality": 4,
                          "cumulative_rows_scanned": 0,
                          "operator_rows_scanned": 0,
                          "operator_timing": 0.0,
                          "result_set_size": 196,
                          "children": [
                            {
                              "result_set_size": 26363,
                              "operator_timing": 0.0,
                              "operator_rows_scanned": 0,
                              "cumulative_rows_scanned": 0,
                              "operator_cardinality": 643,
                              "operator_type": "PROJECTION",
                              "cumulative_cardinality": 0,
                              "cpu_time": 0.0,
                              "operator_name": "PROJECTION",
                              "extra_info": {
                                "Projections": [
                                  "supp_nation",
                                  "cust_nation",
                                  "l_year",
                                  "volume"
                                ],
                                "Estimated Cardinality": "4187"
                              },
                              "children": [
                                {
                                  "operator_name": "PROJECTION",
                                  "cpu_time": 0.0,
                                  "extra_info": {
                                    "Projections": [
                                      "__internal_compress_string_hugeint(#0)",
                                      "__internal_compress_string_hugeint(#1)",
                                      "__internal_compress_integral_utinyint(#2, 1992)",
                                      "#3"
                                    ],
                                    "Estimated Cardinality": "4187"
                                  },
                                  "cumulative_cardinality": 0,
                                  "operator_type": "PROJECTION",
                                  "operator_cardinality": 643,
                                  "cumulative_rows_scanned": 0,
                                  "operator_rows_scanned": 0,
                                  "operator_timing": 0.0,
                                  "result_set_size": 26363,
                                  "children": [
                                    {
                                      "result_set_size": 30864,
                                      "operator_timing": 0.0,
                                      "operator_rows_scanned": 0,
                                      "cumulative_rows_scanned": 0,
                                      "operator_cardinality": 643,
                                      "operator_type": "PROJECTION",
                                      "cumulative_cardinality": 0,
                                      "cpu_time": 0.0,
                                      "operator_name": "PROJECTION",
                                      "extra_info": {
                                        "Projections": [
                                          "supp_nation",
                                          "cust_nation",
                                          "l_year",
                                          "volume"
                                        ],
                                        "Estimated Cardinality": "4187"
                                      },
                                      "children": [
                                        {
                                          "operator_name": "FILTER",
                                          "cpu_time": 0.0,
                                          "extra_info": {
                                            "Expression": "(((n_name = 'FRANCE') AND (n_name = 'GERMANY')) OR ((n_name = 'GERMANY') AND (n_name = 'FRANCE')))",
                                            "Estimated Cardinality": "4187"
                                          },
                                          "cumulative_cardinality": 0,
                                          "operator_type": "FILTER",
                                          "operator_cardinality": 643,
                                          "cumulative_rows_scanned": 0,
                                          "operator_rows_scanned": 0,
                                          "operator_timing": 0.0,
                                          "result_set_size": 33436,
                                          "children": [
                                            {
                                              "result_set_size": 66040,
                                              "operator_timing": 0.0,
                                              "operator_rows_scanned": 0,
                                              "cumulative_rows_scanned": 0,
                                              "operator_cardinality": 1270,
                                              "operator_type": "HASH_JOIN",
                                              "cumulative_cardinality": 0,
                                              "cpu_time": 0.0,
                                              "operator_name": "HASH_JOIN",
                                              "extra_info": {
                                                "Join Type": "INNER",
                                                "Conditions": "o_custkey = c_custkey",
                                                "Estimated Cardinality": "4187"
                                              },
                                              "children": [
                                                {
                                                  "operator_name": "HASH_JOIN",
                                                  "cpu_time": 0.0,
                                                  "extra_info": {
                                                    "Join Type": "INNER",
                                                    "Conditions": "o_orderkey = l_orderkey",
                                                    "Estimated Cardinality": "18882"
                                                  },
                                                  "cumulative_cardinality": 0,
                                                  "operator_type": "HASH_JOIN",
                                                  "operator_cardinality": 15617,
                                                  "cumulative_rows_scanned": 0,
                                                  "operator_rows_scanned": 0,
                                                  "operator_timing": 0.005,
                                                  "result_set_size": 687148,
                                                  "children": [
                                                    {
                                                      "result_set_size": 2397104,
                                                      "operator_timing": 0.001,
                                                      "operator_rows_scanned": 150000,
                                                      "cumulative_rows_scanned": 0,
                                                      "operator_cardinality": 149819,
                                                      "operator_type": "TABLE_SCAN",
                                                      "cumulative_cardinality": 0,
                                                      "cpu_time": 0.0,
                                                      "operator_name": "SEQ_SCAN ",
                                                      "extra_info": {
                                                        "Table": "orders",
                                                        "Type": "Sequential Scan",
                                                        "Projections": [
                                                          "o_orderkey",
                                                          "o_custkey"
                                                        ],
                                                        "Estimated Cardinality": "150000"
                                                      },
                                                      "children": []
                                                    },
                                                    {
                                                      "result_set_size": 687764,
                                                      "operator_timing": 0.002,
                                                      "operator_rows_scanned": 0,
                                                      "cumulative_rows_scanned": 0,
                                                      "operator_cardinality": 15631,
                                                      "operator_type": "HASH_JOIN",
                                                      "cumulative_cardinality": 0,
                                                      "cpu_time": 0.0,
                                                      "operator_name": "HASH_JOIN",
                                                      "extra_info": {
                                                        "Join Type": "INNER",
                                                        "Conditions": "l_suppkey = s_suppkey",
                                                        "Estimated Cardinality": "18749"
                                                      },
                                                      "children": [
                                                        {
                                                          "operator_name": "SEQ_SCAN ",
                                                          "cpu_time": 0.0,
                                                          "extra_info": {
                                                            "Table": "lineitem",
                                                            "Type": "Sequential Scan",
                                                            "Projections": [
                                                              "l_suppkey",
                                                              "l_orderkey",
                                                              "l_shipdate",
                                                              "l_extendedprice",
                                                              "l_discount"
                                                            ],
                                                            "Filters": "l_shipdate>='1995-01-01'::DATE AND l_shipdate<='1996-12-31'::DATE",
                                                            "Estimated Cardinality": "120114"
                                                          },
                                                          "cumulative_cardinality": 0,
                                                          "operator_type": "TABLE_SCAN",
                                                          "operator_cardinality": 176331,
                                                          "cumulative_rows_scanned": 0,
                                                          "operator_rows_scanned": 600572,
                                                          "operator_timing": 0.003,
                                                          "result_set_size": 6347916,
                                                          "children": []
                                                        },
                                                        {
                                                          "operator_name": "HASH_JOIN",
                                                          "cpu_time": 0.0,
                                                          "extra_info": {
                                                            "Join Type": "INNER",
                                                            "Conditions": "s_nationkey = n_nationkey",
                                                            "Estimated Cardinality": "192"
                                                          },
                                                          "cumulative_cardinality": 0,
                                                          "operator_type": "HASH_JOIN",
                                                          "operator_cardinality": 85,
                                                          "cumulative_rows_scanned": 0,
                                                          "operator_rows_scanned": 0,
                                                          "operator_timing": 0.0,
                                                          "result_set_size": 2040,
                                                          "children": [
                                                            {
                                                              "result_set_size": 1020,
                                                              "operator_timing": 0.0,
                                                              "operator_rows_scanned": 1000,
                                                              "cumulative_rows_scanned": 0,
                                                              "operator_cardinality": 85,
                                                              "operator_type": "TABLE_SCAN",
                                                              "cumulative_cardinality": 0,
                                                              "cpu_time": 0.0,
                                                              "operator_name": "SEQ_SCAN ",
                                                              "extra_info": {
                                                                "Table": "supplier",
                                                                "Type": "Sequential Scan",
                                                                "Projections": [
                                                                  "s_suppkey",
                                                                  "s_nationkey"
                                                                ],
                                                                "Estimated Cardinality": "1000"
                                                              },
                                                              "children": []
                                                            },
                                                            {
                                                              "result_set_size": 40,
                                                              "operator_timing": 0.0,
                                                              "operator_rows_scanned": 0,
                                                              "cumulative_rows_scanned": 0,
                                                              "operator_cardinality": 2,
                                                              "operator_type": "FILTER",
                                                              "cumulative_cardinality": 0,
                                                              "cpu_time": 0.0,
                                                              "operator_name": "FILTER",
                                                              "extra_info": {
                                                                "Expression": "((n_name = 'FRANCE') OR (n_name = 'GERMANY'))",
                                                                "Estimated Cardinality": "5"
                                                              },
                                                              "children": [
                                                                {
                                                                  "operator_name": "SEQ_SCAN ",
                                                                  "cpu_time": 0.0,
                                                                  "extra_info": {
                                                                    "Table": "nation",
                                                                    "Type": "Sequential Scan",
                                                                    "Projections": [
                                                                      "n_nationkey",
                                                                      "n_name"
                                                                    ],
                                                                    "Filters": "optional: n_name='FRANCE' OR n_name='GERMANY'",
                                                                    "Estimated Cardinality": "25"
                                                                  },
                                                                  "cumulative_cardinality": 0,
                                                                  "operator_type": "TABLE_SCAN",
                                                                  "operator_cardinality": 25,
                                                                  "cumulative_rows_scanned": 0,
                                                                  "operator_rows_scanned": 25,
                                                                  "operator_timing": 0.0,
                                                                  "result_set_size": 500,
                                                                  "children": []
                                                                }
                                                              ]
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                },
                                                {
                                                  "operator_name": "FILTER",
                                                  "cpu_time": 0.0,
                                                  "extra_info": {
                                                    "Expression": "(c_custkey <= 14999)",
                                                    "Estimated Cardinality": "2884"
                                                  },
                                                  "cumulative_cardinality": 0,
                                                  "operator_type": "FILTER",
                                                  "operator_cardinality": 1173,
                                                  "cumulative_rows_scanned": 0,
                                                  "operator_rows_scanned": 0,
                                                  "operator_timing": 0.0,
                                                  "result_set_size": 28152,
                                                  "children": [
                                                    {
                                                      "result_set_size": 28152,
                                                      "operator_timing": 0.0,
                                                      "operator_rows_scanned": 0,
                                                      "cumulative_rows_scanned": 0,
                                                      "operator_cardinality": 1173,
                                                      "operator_type": "HASH_JOIN",
                                                      "cumulative_cardinality": 0,
                                                      "cpu_time": 0.0,
                                                      "operator_name": "HASH_JOIN",
                                                      "extra_info": {
                                                        "Join Type": "INNER",
                                                        "Conditions": "c_nationkey = n_nationkey",
                                                        "Estimated Cardinality": "2884"
                                                      },
                                                      "children": [
                                                        {
                                                          "operator_name": "SEQ_SCAN ",
                                                          "cpu_time": 0.0,
                                                          "extra_info": {
                                                            "Table": "customer",
                                                            "Type": "Sequential Scan",
                                                            "Projections": [
                                                              "c_custkey",
                                                              "c_nationkey"
                                                            ],
                                                            "Estimated Cardinality": "15000"
                                                          },
                                                          "cumulative_cardinality": 0,
                                                          "operator_type": "TABLE_SCAN",
                                                          "operator_cardinality": 1173,
                                                          "cumulative_rows_scanned": 0,
                                                          "operator_rows_scanned": 15000,
                                                          "operator_timing": 0.0,
                                                          "result_set_size": 14076,
                                                          "children": []
                                                        },
                                                        {
                                                          "operator_name": "FILTER",
                                                          "cpu_time": 0.0,
                                                          "extra_info": {
                                                            "Expression": "((n_name = 'GERMANY') OR (n_name = 'FRANCE'))",
                                                            "Estimated Cardinality": "25"
                                                          },
                                                          "cumulative_cardinality": 0,
                                                          "operator_type": "FILTER",
                                                          "operator_cardinality": 2,
                                                          "cumulative_rows_scanned": 0,
                                                          "operator_rows_scanned": 0,
                                                          "operator_timing": 0.0,
                                                          "result_set_size": 40,
                                                          "children": [
                                                            {
                                                              "result_set_size": 500,
                                                              "operator_timing": 0.0,
                                                              "operator_rows_scanned": 25,
                                                              "cumulative_rows_scanned": 0,
                                                              "operator_cardinality": 25,
                                                              "operator_type": "TABLE_SCAN",
                                                              "cumulative_cardinality": 0,
                                                              "cpu_time": 0.0,
                                                              "operator_name": "SEQ_SCAN ",
                                                              "extra_info": {
                                                                "Table": "nation",
                                                                "Type": "Sequential Scan",
                                                                "Projections": [
                                                                  "n_nationkey",
                                                                  "n_name"
                                                                ],
                                                                "Filters": "optional: n_name='GERMANY' OR n_name='FRANCE'",
                                                                "Estimated Cardinality": "25"
                                                              },
                                                              "children": []
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
`,
  "example 2": `{
  "result_set_size": 0,
  "cumulative_rows_scanned": 0,
  "cumulative_cardinality": 0,
  "extra_info": {},
  "cpu_time": 0.0,
  "blocked_thread_time": 0.0,
  "rows_returned": 0,
  "query_name": "",
  "latency": 0.0,
  "children": [
    {
      "result_set_size": 0,
      "operator_timing": 0.0,
      "operator_rows_scanned": 0,
      "cumulative_rows_scanned": 0,
      "operator_cardinality": 0,
      "operator_type": "EXPLAIN_ANALYZE",
      "cumulative_cardinality": 0,
      "cpu_time": 0.0,
      "operator_name": "EXPLAIN_ANALYZE",
      "extra_info": {},
      "children": [
        {
          "operator_name": "TOP_N",
          "cpu_time": 0.0,
          "extra_info": {
            "Top": "100",
            "Order By": [
              "count_star() DESC",
              "memory.main.supplier.s_name ASC"
            ]
          },
          "cumulative_cardinality": 0,
          "operator_type": "TOP_N",
          "operator_cardinality": 34,
          "cumulative_rows_scanned": 0,
          "operator_rows_scanned": 0,
          "operator_timing": 0.0,
          "result_set_size": 816,
          "children": [
            {
              "result_set_size": 816,
              "operator_timing": 0.001,
              "operator_rows_scanned": 0,
              "cumulative_rows_scanned": 0,
              "operator_cardinality": 34,
              "operator_type": "HASH_GROUP_BY",
              "cumulative_cardinality": 0,
              "cpu_time": 0.0,
              "operator_name": "HASH_GROUP_BY",
              "extra_info": {
                "Groups": "#0",
                "Aggregates": "count_star()",
                "Estimated Cardinality": "3370"
              },
              "children": [
                {
                  "operator_name": "PROJECTION",
                  "cpu_time": 0.0,
                  "extra_info": {
                    "Projections": "s_name",
                    "Estimated Cardinality": "6740"
                  },
                  "cumulative_cardinality": 0,
                  "operator_type": "PROJECTION",
                  "operator_cardinality": 465,
                  "cumulative_rows_scanned": 0,
                  "operator_rows_scanned": 0,
                  "operator_timing": 0.0,
                  "result_set_size": 7440,
                  "children": [
                    {
                      "result_set_size": 0,
                      "operator_timing": 0.001,
                      "operator_rows_scanned": 0,
                      "cumulative_rows_scanned": 0,
                      "operator_cardinality": 0,
                      "operator_type": "RIGHT_DELIM_JOIN",
                      "cumulative_cardinality": 0,
                      "cpu_time": 0.0,
                      "operator_name": "RIGHT_DELIM_JOIN",
                      "extra_info": {
                        "Join Type": "RIGHT_ANTI",
                        "Conditions": [
                          "l_orderkey IS NOT DISTINCT FROM l_orderkey",
                          "l_suppkey IS NOT DISTINCT FROM l_suppkey"
                        ],
                        "Estimated Cardinality": "6740",
                        "Delim Index": "2"
                      },
                      "children": [
                        {
                          "operator_name": "RIGHT_DELIM_JOIN",
                          "cpu_time": 0.0,
                          "extra_info": {
                            "Join Type": "RIGHT_SEMI",
                            "Conditions": [
                              "l_orderkey IS NOT DISTINCT FROM l_orderkey",
                              "l_suppkey IS NOT DISTINCT FROM l_suppkey"
                            ],
                            "Estimated Cardinality": "6740",
                            "Delim Index": "1"
                          },
                          "cumulative_cardinality": 0,
                          "operator_type": "RIGHT_DELIM_JOIN",
                          "operator_cardinality": 0,
                          "cumulative_rows_scanned": 0,
                          "operator_rows_scanned": 0,
                          "operator_timing": 0.002,
                          "result_set_size": 0,
                          "children": [
                            {
                              "result_set_size": 343600,
                              "operator_timing": 0.003,
                              "operator_rows_scanned": 0,
                              "cumulative_rows_scanned": 0,
                              "operator_cardinality": 8590,
                              "operator_type": "HASH_JOIN",
                              "cumulative_cardinality": 0,
                              "cpu_time": 0.0,
                              "operator_name": "HASH_JOIN",
                              "extra_info": {
                                "Join Type": "INNER",
                                "Conditions": "o_orderkey = l_orderkey",
                                "Estimated Cardinality": "2517"
                              },
                              "children": [
                                {
                                  "operator_name": "SEQ_SCAN ",
                                  "cpu_time": 0.0,
                                  "extra_info": {
                                    "Table": "orders",
                                    "Type": "Sequential Scan",
                                    "Projections": "o_orderkey",
                                    "Filters": "o_orderstatus='F'",
                                    "Estimated Cardinality": "50000"
                                  },
                                  "cumulative_cardinality": 0,
                                  "operator_type": "TABLE_SCAN",
                                  "operator_cardinality": 72880,
                                  "cumulative_rows_scanned": 0,
                                  "operator_rows_scanned": 150000,
                                  "operator_timing": 0.002,
                                  "result_set_size": 583040,
                                  "children": []
                                },
                                {
                                  "operator_name": "HASH_JOIN",
                                  "cpu_time": 0.0,
                                  "extra_info": {
                                    "Join Type": "INNER",
                                    "Conditions": "l_suppkey = s_suppkey",
                                    "Estimated Cardinality": "7499"
                                  },
                                  "cumulative_cardinality": 0,
                                  "operator_type": "HASH_JOIN",
                                  "operator_cardinality": 17752,
                                  "cumulative_rows_scanned": 0,
                                  "operator_rows_scanned": 0,
                                  "operator_timing": 0.004,
                                  "result_set_size": 568064,
                                  "children": [
                                    {
                                      "result_set_size": 5497472,
                                      "operator_timing": 0.0,
                                      "operator_rows_scanned": 0,
                                      "cumulative_rows_scanned": 0,
                                      "operator_cardinality": 343592,
                                      "operator_type": "PROJECTION",
                                      "cumulative_cardinality": 0,
                                      "cpu_time": 0.0,
                                      "operator_name": "PROJECTION",
                                      "extra_info": {
                                        "Projections": [
                                          "#0",
                                          "#1"
                                        ],
                                        "Estimated Cardinality": "120114"
                                      },
                                      "children": [
                                        {
                                          "operator_name": "FILTER",
                                          "cpu_time": 0.0,
                                          "extra_info": {
                                            "Expression": "(l_receiptdate > l_commitdate)",
                                            "Estimated Cardinality": "120114"
                                          },
                                          "cumulative_cardinality": 0,
                                          "operator_type": "FILTER",
                                          "operator_cardinality": 343592,
                                          "cumulative_rows_scanned": 0,
                                          "operator_rows_scanned": 0,
                                          "operator_timing": 0.007,
                                          "result_set_size": 8246208,
                                          "children": [
                                            {
                                              "result_set_size": 13035672,
                                              "operator_timing": 0.002,
                                              "operator_rows_scanned": 600572,
                                              "cumulative_rows_scanned": 0,
                                              "operator_cardinality": 543153,
                                              "operator_type": "TABLE_SCAN",
                                              "cumulative_cardinality": 0,
                                              "cpu_time": 0.0,
                                              "operator_name": "SEQ_SCAN ",
                                              "extra_info": {
                                                "Table": "lineitem",
                                                "Type": "Sequential Scan",
                                                "Projections": [
                                                  "l_suppkey",
                                                  "l_orderkey",
                                                  "l_receiptdate",
                                                  "l_commitdate"
                                                ],
                                                "Estimated Cardinality": "600572"
                                              },
                                              "children": []
                                            }
                                          ]
                                        }
                                      ]
                                    },
                                    {
                                      "result_set_size": 1316,
                                      "operator_timing": 0.0,
                                      "operator_rows_scanned": 0,
                                      "cumulative_rows_scanned": 0,
                                      "operator_cardinality": 47,
                                      "operator_type": "HASH_JOIN",
                                      "cumulative_cardinality": 0,
                                      "cpu_time": 0.0,
                                      "operator_name": "HASH_JOIN",
                                      "extra_info": {
                                        "Join Type": "INNER",
                                        "Conditions": "s_nationkey = n_nationkey",
                                        "Estimated Cardinality": "76"
                                      },
                                      "children": [
                                        {
                                          "operator_name": "SEQ_SCAN ",
                                          "cpu_time": 0.0,
                                          "extra_info": {
                                            "Table": "supplier",
                                            "Type": "Sequential Scan",
                                            "Projections": [
                                              "s_suppkey",
                                              "s_nationkey",
                                              "s_name"
                                            ],
                                            "Estimated Cardinality": "1000"
                                          },
                                          "cumulative_cardinality": 0,
                                          "operator_type": "TABLE_SCAN",
                                          "operator_cardinality": 47,
                                          "cumulative_rows_scanned": 0,
                                          "operator_rows_scanned": 1000,
                                          "operator_timing": 0.0,
                                          "result_set_size": 1316,
                                          "children": []
                                        },
                                        {
                                          "operator_name": "SEQ_SCAN ",
                                          "cpu_time": 0.0,
                                          "extra_info": {
                                            "Table": "nation",
                                            "Type": "Sequential Scan",
                                            "Projections": "n_nationkey",
                                            "Filters": "n_name='SAUDI ARABIA'",
                                            "Estimated Cardinality": "2"
                                          },
                                          "cumulative_cardinality": 0,
                                          "operator_type": "TABLE_SCAN",
                                          "operator_cardinality": 1,
                                          "cumulative_rows_scanned": 0,
                                          "operator_rows_scanned": 25,
                                          "operator_timing": 0.0,
                                          "result_set_size": 4,
                                          "children": []
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              "result_set_size": 265440,
                              "operator_timing": 0.004,
                              "operator_rows_scanned": 0,
                              "cumulative_rows_scanned": 0,
                              "operator_cardinality": 8295,
                              "operator_type": "HASH_JOIN",
                              "cumulative_cardinality": 0,
                              "cpu_time": 0.0,
                              "operator_name": "HASH_JOIN",
                              "extra_info": {
                                "Join Type": "RIGHT_SEMI",
                                "Conditions": [
                                  "l_orderkey IS NOT DISTINCT FROM l_orderkey",
                                  "l_suppkey IS NOT DISTINCT FROM l_suppkey"
                                ],
                                "Estimated Cardinality": "6740"
                              },
                              "children": [
                                {
                                  "operator_name": "HASH_JOIN",
                                  "cpu_time": 0.0,
                                  "extra_info": {
                                    "Join Type": "INNER",
                                    "Conditions": [
                                      "l_orderkey = l_orderkey",
                                      "l_suppkey != l_suppkey"
                                    ],
                                    "Estimated Cardinality": "6740"
                                  },
                                  "cumulative_cardinality": 0,
                                  "operator_type": "HASH_JOIN",
                                  "operator_cardinality": 34432,
                                  "cumulative_rows_scanned": 0,
                                  "operator_rows_scanned": 0,
                                  "operator_timing": 0.005,
                                  "result_set_size": 550912,
                                  "children": [
                                    {
                                      "result_set_size": 9606112,
                                      "operator_timing": 0.0,
                                      "operator_rows_scanned": 600572,
                                      "cumulative_rows_scanned": 0,
                                      "operator_cardinality": 600382,
                                      "operator_type": "TABLE_SCAN",
                                      "cumulative_cardinality": 0,
                                      "cpu_time": 0.0,
                                      "operator_name": "SEQ_SCAN ",
                                      "extra_info": {
                                        "Table": "lineitem",
                                        "Type": "Sequential Scan",
                                        "Projections": [
                                          "l_orderkey",
                                          "l_suppkey"
                                        ],
                                        "Estimated Cardinality": "600572"
                                      },
                                      "children": []
                                    },
                                    {
                                      "result_set_size": 0,
                                      "operator_timing": 0.0,
                                      "operator_rows_scanned": 0,
                                      "cumulative_rows_scanned": 0,
                                      "operator_cardinality": 0,
                                      "operator_type": "DELIM_SCAN",
                                      "cumulative_cardinality": 0,
                                      "cpu_time": 0.0,
                                      "operator_name": "DELIM_SCAN",
                                      "extra_info": {
                                        "Delim Index": "1",
                                        "Estimated Cardinality": "1258"
                                      },
                                      "children": []
                                    }
                                  ]
                                },
                                {
                                  "operator_name": "DUMMY_SCAN",
                                  "cpu_time": 0.0,
                                  "extra_info": {},
                                  "cumulative_cardinality": 0,
                                  "operator_type": "DUMMY_SCAN",
                                  "operator_cardinality": 0,
                                  "cumulative_rows_scanned": 0,
                                  "operator_rows_scanned": 0,
                                  "operator_timing": 0.0,
                                  "result_set_size": 0,
                                  "children": []
                                }
                              ]
                            },
                            {
                              "result_set_size": 137296,
                              "operator_timing": 0.0,
                              "operator_rows_scanned": 0,
                              "cumulative_rows_scanned": 0,
                              "operator_cardinality": 8581,
                              "operator_type": "HASH_GROUP_BY",
                              "cumulative_cardinality": 0,
                              "cpu_time": 0.0,
                              "operator_name": "HASH_GROUP_BY",
                              "extra_info": {
                                "Groups": [
                                  "#1",
                                  "#2"
                                ],
                                "Aggregates": "",
                                "Estimated Cardinality": "6740"
                              },
                              "children": []
                            }
                          ]
                        },
                        {
                          "operator_name": "HASH_JOIN",
                          "cpu_time": 0.0,
                          "extra_info": {
                            "Join Type": "RIGHT_ANTI",
                            "Conditions": [
                              "l_orderkey IS NOT DISTINCT FROM l_orderkey",
                              "l_suppkey IS NOT DISTINCT FROM l_suppkey"
                            ],
                            "Estimated Cardinality": "6740"
                          },
                          "cumulative_cardinality": 0,
                          "operator_type": "HASH_JOIN",
                          "operator_cardinality": 465,
                          "cumulative_rows_scanned": 0,
                          "operator_rows_scanned": 0,
                          "operator_timing": 0.0,
                          "result_set_size": 7440,
                          "children": [
                            {
                              "result_set_size": 348336,
                              "operator_timing": 0.003,
                              "operator_rows_scanned": 0,
                              "cumulative_rows_scanned": 0,
                              "operator_cardinality": 21771,
                              "operator_type": "HASH_JOIN",
                              "cumulative_cardinality": 0,
                              "cpu_time": 0.0,
                              "operator_name": "HASH_JOIN",
                              "extra_info": {
                                "Join Type": "INNER",
                                "Conditions": [
                                  "l_orderkey = l_orderkey",
                                  "l_suppkey != l_suppkey"
                                ],
                                "Estimated Cardinality": "3611"
                              },
                              "children": [
                                {
                                  "operator_name": "PROJECTION",
                                  "cpu_time": 0.0,
                                  "extra_info": {
                                    "Projections": [
                                      "#0",
                                      "#1"
                                    ],
                                    "Estimated Cardinality": "120114"
                                  },
                                  "cumulative_cardinality": 0,
                                  "operator_type": "PROJECTION",
                                  "operator_cardinality": 379698,
                                  "cumulative_rows_scanned": 0,
                                  "operator_rows_scanned": 0,
                                  "operator_timing": 0.0,
                                  "result_set_size": 6075168,
                                  "children": [
                                    {
                                      "result_set_size": 9112752,
                                      "operator_timing": 0.006,
                                      "operator_rows_scanned": 0,
                                      "cumulative_rows_scanned": 0,
                                      "operator_cardinality": 379698,
                                      "operator_type": "FILTER",
                                      "cumulative_cardinality": 0,
                                      "cpu_time": 0.0,
                                      "operator_name": "FILTER",
                                      "extra_info": {
                                        "Expression": "(l_receiptdate > l_commitdate)",
                                        "Estimated Cardinality": "120114"
                                      },
                                      "children": [
                                        {
                                          "operator_name": "SEQ_SCAN ",
                                          "cpu_time": 0.0,
                                          "extra_info": {
                                            "Table": "lineitem",
                                            "Type": "Sequential Scan",
                                            "Projections": [
                                              "l_orderkey",
                                              "l_suppkey",
                                              "l_receiptdate",
                                              "l_commitdate"
                                            ],
                                            "Estimated Cardinality": "600572"
                                          },
                                          "cumulative_cardinality": 0,
                                          "operator_type": "TABLE_SCAN",
                                          "operator_cardinality": 600382,
                                          "cumulative_rows_scanned": 0,
                                          "operator_rows_scanned": 600572,
                                          "operator_timing": 0.0,
                                          "result_set_size": 14409168,
                                          "children": []
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  "operator_name": "DELIM_SCAN",
                                  "cpu_time": 0.0,
                                  "extra_info": {
                                    "Delim Index": "2",
                                    "Estimated Cardinality": "3370"
                                  },
                                  "cumulative_cardinality": 0,
                                  "operator_type": "DELIM_SCAN",
                                  "operator_cardinality": 0,
                                  "cumulative_rows_scanned": 0,
                                  "operator_rows_scanned": 0,
                                  "operator_timing": 0.0,
                                  "result_set_size": 0,
                                  "children": []
                                }
                              ]
                            },
                            {
                              "result_set_size": 0,
                              "operator_timing": 0.0,
                              "operator_rows_scanned": 0,
                              "cumulative_rows_scanned": 0,
                              "operator_cardinality": 0,
                              "operator_type": "DUMMY_SCAN",
                              "cumulative_cardinality": 0,
                              "cpu_time": 0.0,
                              "operator_name": "DUMMY_SCAN",
                              "extra_info": {},
                              "children": []
                            }
                          ]
                        },
                        {
                          "operator_name": "HASH_GROUP_BY",
                          "cpu_time": 0.0,
                          "extra_info": {
                            "Groups": [
                              "#0",
                              "#1"
                            ],
                            "Aggregates": "",
                            "Estimated Cardinality": "6740"
                          },
                          "cumulative_cardinality": 0,
                          "operator_type": "HASH_GROUP_BY",
                          "operator_cardinality": 8286,
                          "cumulative_rows_scanned": 0,
                          "operator_rows_scanned": 0,
                          "operator_timing": 0.0,
                          "result_set_size": 132576,
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
`,
};

export default duckdbExamples;
