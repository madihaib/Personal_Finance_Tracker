import streamlit as st
import pandas as pd
import requests
from datetime import date

FX_RATES = {
    "USD": 1.0,     # base
    "EUR": 0.92,
    "GBP": 0.79,
    "PHP": 56.10,
    "INR": 83.20,
    "MXN": 17.20,
    "CAD": 1.34
}

def get_latest_rate(frm, to):
    if frm == to:
        return 1
    return FX_RATES[to] / FX_RATES[frm]

st.set_page_config(page_title="Budget Guardian + Currency Exchange", layout="wide")

def calc_send_amount(target_receive, rate, flat_fee, pct_fee):
    base = target_receive / rate
    if pct_fee > 0:
        base = base / (1 - pct_fee)
    return base + flat_fee

def calc_receive_amount(send_amt, rate, flat_fee, pct_fee):
    after_flat = max(send_amt - flat_fee, 0)
    after_pct = after_flat * (1 - pct_fee)
    return after_pct * rate

if "transactions" not in st.session_state:
    st.session_state.transactions = pd.DataFrame(
        columns=["Date", "Category", "Description", "Amount"]
    )



st.title("Budget Guardian + Currency Exchange")

tab1, tab2 = st.tabs(["💸 Budget", "🌍 Currency Exchange"])


with tab1:

    st.subheader("Biweekly Budget")
    budget = st.number_input("Enter biweekly budget", value=600.0)

    st.divider()
    st.subheader("Add Transaction")

    with st.form("add_form"):
        d = st.date_input("Date", value=date.today())
        cat = st.selectbox("Category", ["Food","Transport","Shopping","Bills","School","Other"])
        desc = st.text_input("Description")
        amt = st.number_input("Amount", min_value=0.0)
        submitted = st.form_submit_button("Add")

    if submitted:
        new_row = pd.DataFrame([[d,cat,desc,amt]],
                               columns=["Date","Category","Description","Amount"])
        st.session_state.transactions = pd.concat(
            [st.session_state.transactions,new_row],
            ignore_index=True
        )
        st.success("Transaction added")

    total_spent = st.session_state.transactions["Amount"].sum()
    remaining = budget - total_spent

    st.metric("Total Spent", f"{total_spent:.2f}")
    st.metric("Remaining", f"{remaining:.2f}")

    st.subheader("Transactions")
    st.dataframe(st.session_state.transactions)

    st.subheader("Spending by Category")
    if len(st.session_state.transactions) > 0:
        chart_data = st.session_state.transactions.groupby("Category")["Amount"].sum()
        st.bar_chart(chart_data)

# ============ TAB 2: Currency ============
with tab2:

    st.subheader("Allowance Currency Calculator")

    col1, col2 = st.columns(2)

    with col1:
        frm = st.selectbox("Parent Currency", ["USD","EUR","GBP","PHP","INR","MXN","CAD"])
        to = st.selectbox("Student Currency", ["USD","EUR","GBP","PHP","INR","MXN","CAD"])
        target = st.number_input("Student should receive (biweekly)", value=600.0)

    with col2:
        flat_fee = st.number_input("Flat transfer fee", value=0.0)
        pct_fee = st.number_input("Percent fee", value=0.0) / 100

    rate = get_latest_rate(frm, to)

    if rate is None:
        st.error("Could not fetch exchange rate")
    else:
        st.write(f"Current rate: 1 {frm} = {rate:.4f} {to}")

        send_amt = calc_send_amount(target, rate, flat_fee, pct_fee)
        receive_amt = calc_receive_amount(send_amt, rate, flat_fee, pct_fee)

        st.metric("Parent should send", f"{send_amt:.2f} {frm}")
        st.metric("Student receives", f"{receive_amt:.2f} {to}")